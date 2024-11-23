import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { SignedIn } from "@clerk/clerk-react";
import { SignedOut } from "@clerk/clerk-react";
import { UserButton } from "@clerk/clerk-react";
import { SignInButton } from "@clerk/clerk-react";
const header = () => {
  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link>
          <img src="/logo.png" className="h-10" />
        </Link>

        {/* <Button variant="outline">Login</Button> */}

        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>
    </>
  );
};

export default header;
