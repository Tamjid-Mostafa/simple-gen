"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 md:px-6 flex h-14 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-teal-500 flex justify-center items-center w-8 h-8 border-2 border-primary">
            S
          </div>
          <span className="font-semibold">SimpleGen</span>
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
          <Button
            size="sm"
            className="bg-teal-500 hover:bg-teal-600 border-2 border-primary"
          >
            Try SimpleGen
          </Button>
        </nav>
        <div className="flex items-center gap-4 md:hidden">
          <Button
            size="sm"
            className="bg-teal-500 hover:bg-teal-600 border-2 border-primary hidden sm:block"
          >
            Try SimpleGen
          </Button>

          <button className="md:hidden" onClick={() => setOpen(true)}>
            <Menu />
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 30,
              }}
              className="fixed inset-0 bg-secondary z-50 flex justify-center items-center"
            >
              <button
                className="absolute top-6 right-6 text-white"
                onClick={() => setOpen(false)}
              >
                <X size={28} />
              </button>
              <motion.div className="flex flex-col gap-6 items-center text-base sm:text-lg md:text-xl lg:text-2xl">
                <Link href="/blog" className="" onClick={() => setOpen(false)}>
                  Blog
                </Link>
                <Link href="/tools" className="" onClick={() => setOpen(false)}>
                  Tools
                </Link>
                <Link
                  href="/subscribe"
                  className=""
                  onClick={() => setOpen(false)}
                >
                  Subscribe
                </Link>
                <Link href="/login" className="" onClick={() => setOpen(false)}>
                  Login
                </Link>
                <Button
                  size="lg"
                  className="bg-teal-500 hover:bg-teal-600 border-2 border-primary block sm:hidden"
                >
                  Try SimpleGen
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
