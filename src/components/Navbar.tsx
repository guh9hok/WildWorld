import Link from "next/link";

export default function Navbar() {
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
          <div className="flex items-center gap-6">
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
            <Link
              href="/#about"
              className="text-green-100 hover:text-white transition-colors text-sm font-medium"
            >
              About
            </Link>
            <Link
              href="/moderator"
              className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
            >
              Moderator
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
