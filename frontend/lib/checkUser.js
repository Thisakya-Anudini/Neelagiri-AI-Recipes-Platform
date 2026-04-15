import { clerkClient, currentUser } from "@clerk/nextjs/server";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

const safeReadTextSnippet = async (res, limit = 400) => {
  try {
    const text = await res.text();
    const cleaned = String(text || "").replace(/\s+/g, " ").trim();
    return cleaned.length > limit ? `${cleaned.slice(0, limit)}…` : cleaned;
  } catch {
    return "";
  }
};

const safeReadJson = async (res, label) => {
  const contentType = res.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    const snippet = await safeReadTextSnippet(res);
    throw new Error(
      `${label} returned non-JSON (status ${res.status}). ${snippet}`
    );
  }
  return await res.json();
};

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
    const client = await clerkClient();
    const subscription = await client.billing.getUserBillingSubscription(
      user.id
    );
    subscriptionTier = subscription?.status === "active" ? "pro" : "free";
  } catch (e) {
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
        const snippet = await safeReadTextSnippet(res);
        console.error(
          `Strapi error (${res.status}) while looking up user by clerkId. ${snippet}`
        );
        return null;
      }

      const payload = await safeReadJson(res, "Strapi users lookup (clerkId)");
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

      const payload = await safeReadJson(res, "Strapi users lookup (email)");
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

    if (!rolesResponse.ok) {
      const snippet = await safeReadTextSnippet(rolesResponse);
      console.error(
        `Strapi error (${rolesResponse.status}) fetching roles. ${snippet}`
      );
      return null;
    }

    const rolesData = await safeReadJson(rolesResponse, "Strapi roles");
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

    try {
      return await safeReadJson(newUserResponse, "Strapi create user");
    } catch (e) {
      console.error("❌ Error parsing create user response:", e?.message || e);
      return null;
    }
  } catch (error) {
    console.error("❌ Error in checkUser:", error?.message || error);
    return null;
  }
};
