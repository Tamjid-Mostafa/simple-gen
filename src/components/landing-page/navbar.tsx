import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 md:px-6 flex h-14 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-teal-500 flex flex-col justify-center items-center w-8 h-8 border-2 border-primary">
            S
          </div>
          <span className="font-semibold">
            SimpleGen
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/blog" className="text-sm font-medium">
            Blog
          </Link>
          <Link href="/tools" className="text-sm font-medium">
            Tools
          </Link>
          <Link href="/subscribe" className="text-sm font-medium">
            Subscribe
          </Link>
          <Link href="/login" className="text-sm font-medium">
            Login
          </Link>
          <Button size="sm" className="bg-teal-500 hover:bg-teal-600 border-2 border-primary">
            Try SimpleGen
          </Button>
        </nav>
      </div>
    </header>
  )
}
