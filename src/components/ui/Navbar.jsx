"use client";

import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  if (isDashboard) return null;

  return (
    <nav className="p-4 flex justify-end gap-4">
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </nav>
  );
}
