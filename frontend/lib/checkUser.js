import { auth, currentUser } from "@clerk/nextjs/server";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

const normalizeUsersResponse = (payload) => {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;

  if (Array.isArray(payload?.data)) {
    return payload.data.map((entry) =>
      entry?.attributes ? { id: entry.id, ...entry.attributes } : entry
    );
  }

  return [];
};

export const checkUser = async () => {
  const user = await currentUser();

  if (!user) {
    console.log("No User found");
    return null;
  }

  if (!STRAPI_API_TOKEN) {
    console.error("❌ STRAPI_API_TOKEN is missing in .env");
    return null;
  }

  let subscriptionTier = "free";
  try {
    const { has } = auth();
    subscriptionTier = has?.({ plan: "pro" }) ? "pro" : "free";
  } catch {
    subscriptionTier = "free";
  }

  try {
    const email = user.emailAddresses?.[0]?.emailAddress;

    const findExistingByClerkId = async () => {
      const res = await fetch(
        `${STRAPI_URL}/api/users?filters[clerkId][$eq]=${user.id}`,
        {
          headers: { Authorization: `Bearer ${STRAPI_API_TOKEN}` },
          cache: "no-store",
        }
      );

      if (!res.ok) {
        const text = await res.text();
        console.error("Strapi error response:", text);
        return null;
      }

      const payload = await res.json();
      const users = normalizeUsersResponse(payload);
      return users[0] || null;
    };

    const findExistingByEmail = async () => {
      if (!email) return null;

      const res = await fetch(
        `${STRAPI_URL}/api/users?filters[email][$eq]=${encodeURIComponent(
          email
        )}`,
        {
          headers: { Authorization: `Bearer ${STRAPI_API_TOKEN}` },
          cache: "no-store",
        }
      );

      if (!res.ok) return null;

      const payload = await res.json();
      const users = normalizeUsersResponse(payload);
      return users[0] || null;
    };

    const updateUser = async (existingUser) => {
      const existingUserId = existingUser?.id ?? existingUser?.documentId;
      if (!existingUserId) return existingUser;

      await fetch(`${STRAPI_URL}/api/users/${existingUserId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({
          clerkId: user.id,
          subscriptionTier,
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          imageUrl: user.imageUrl || "",
        }),
      });

      return { ...existingUser, clerkId: user.id, subscriptionTier };
    };

    const existingByClerkId = await findExistingByClerkId();
    if (existingByClerkId) {
      if (existingByClerkId.subscriptionTier !== subscriptionTier) {
        await updateUser(existingByClerkId);
      }
      return { ...existingByClerkId, subscriptionTier };
    }

    const existingByEmail = await findExistingByEmail();
    if (existingByEmail) {
      return await updateUser(existingByEmail);
    }

    // Get authenticated role
    const rolesResponse = await fetch(
      `${STRAPI_URL}/api/users-permissions/roles`,
      { headers: { Authorization: `Bearer ${STRAPI_API_TOKEN}` } }
    );

    const rolesData = await rolesResponse.json();
    const authenticatedRole = rolesData?.roles?.find(
      (role) => role.type === "authenticated"
    );

    if (!authenticatedRole) {
      console.error("❌ Authenticated role not found");
      return null;
    }

    const userData = {
      username:
        user.username || (email ? email.split("@")[0] : `user_${user.id}`),
      email,
      password: `clerk_managed_${user.id}_${Date.now()}`,
      confirmed: true,
      blocked: false,
      role: authenticatedRole.id,
      clerkId: user.id,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      imageUrl: user.imageUrl || "",
      subscriptionTier,
    };

    const newUserResponse = await fetch(`${STRAPI_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify(userData),
    });

    if (!newUserResponse.ok) {
      const errorText = await newUserResponse.text();
      console.error("❌ Error creating user:", errorText);

      // Last-resort: if a race created the user (or clerkId filter missed it),
      // attach clerkId to the existing user by email.
      const racedExistingByEmail = await findExistingByEmail();
      if (racedExistingByEmail) return await updateUser(racedExistingByEmail);

      return null;
    }

    return await newUserResponse.json();
  } catch (error) {
    console.error("❌ Error in checkUser:", error?.message || error);
    return null;
  }
};

