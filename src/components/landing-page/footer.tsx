import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <div className="flex items-center">
            <div className="border border-white px-2 py-1 text-xs">Design by Creative Studio</div>
          </div>
          <div className="mt-2 text-sm text-slate-400">
            © 2025 SimpleGen. All Rights Reserved.
          </div>
        </div>

        <div className="flex gap-6">
          <Link href="/login" className="text-sm hover:underline">
            Login
          </Link>
          <Link href="/try-SimpleGen" className="text-sm hover:underline">
            Try SimpleGen
          </Link>
          <Link href="/privacy-policy" className="text-sm hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  )
}
