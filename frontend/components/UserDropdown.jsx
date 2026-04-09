"use client";// @refresh reload

import { UserButton } from "@clerk/nextjs";
import { Refrigerator, Cookie } from "lucide-react";
import React from "react";

const UserDropdown = () => {
  return (

    // UserButton is a component from Clerk that provides a dropdown menu for user actions such as 
    // viewing recipes, 
    // pantry, and 
    // managing account settings. 
    // It automatically handles user authentication state and displays appropriate options based on whether the user is signed in or not.
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Link
          label="My Recipes"
          labelIcon={<Cookie size={16} />}
          href="/recipes"
        />
        <UserButton.Link
          label="My Pantry"
          labelIcon={<Refrigerator size={16} />}
          href="/pantry"
        />
        <UserButton.Action label="manageAccount" />
      </UserButton.MenuItems>
    </UserButton>
  );
};

export default UserDropdown;
