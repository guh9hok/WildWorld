"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const userRole = session?.user?.role;

  return (
    <nav className="bg-green-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div>
              <span className="text-xl font-bold tracking-tight">WildWorld</span>
              <span className="hidden sm:block text-xs text-green-300 -mt-1">Animal Database</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-green-100 hover:text-white transition-colors text-sm font-medium"
            >
              All Animals
            </Link>
            <Link
              href="/#categories"
              className="text-green-100 hover:text-white transition-colors text-sm font-medium"
            >
              Categories
            </Link>
            
            {status === "authenticated" ? (
              <>
                {(userRole === "moderator" || userRole === "admin") && (
                  <Link
                    href="/moderator"
                    className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                  >
                    Moderator
                  </Link>
                )}
                {userRole === "admin" && (
                  <Link
                    href="/admin"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                  >
                    Admin
                  </Link>
                )}
                <span className="text-green-200 text-sm">
                  {session.user?.name}
                </span>
                <button
                  onClick={handleSignOut}
                  className="text-green-100 hover:text-white transition-colors text-sm font-medium"
                >
                  Sign Out
                </button>
              </>
            ) : status === "unauthenticated" ? (
              <>
                <Link
                  href="/auth/signin"
                  className="text-green-100 hover:text-white transition-colors text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
}
