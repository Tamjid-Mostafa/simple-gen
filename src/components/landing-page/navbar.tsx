"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ModeToggle } from "../mode-toggle";
import { SignOutButton, useUser } from "@clerk/nextjs";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  // Hide after 30vh, then hide on scroll down, show on scroll up with rAF
  useEffect(() => {
    const threshold = window.innerHeight * 0.3;
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          if (currentY > threshold) {
            setShowNav(currentY <= lastScrollY.current);
          } else {
            setShowNav(true);
          }
          lastScrollY.current = currentY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      animate={{ y: showNav ? 0 : -120, scale: showNav ? 1 : 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="rounded-b-xl md:rounded-xl py-3 max-w-7xl mx-auto w-full sticky top-0 md:top-3 z-50 backdrop-blur-xl bg-secondary/20 shadow-xs shadow-primary"
    >
      <div className="container mx-auto px-4 md:px-6 flex h-14 items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-teal-500 flex justify-center items-center w-8 h-8 border-2 border-primary">
              S
            </div>
            <span className="font-semibold">SimpleGen</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-4">
          <Link href="/blog" className="text-sm font-medium">
            <span className="inline-block">Blog</span>
          </Link>
          <Link href="/tools" className="text-sm font-medium">
            <span className="inline-block">Tools</span>
          </Link>
          <Link href="/subscribe" className="text-sm font-medium">
            <span className="inline-block">Subscribe</span>
          </Link>
          <Link href="/dashboard" className="text-sm font-medium">
            Login
          </Link>
          <Link href="/sign-up">
            <Button
              size="sm"
              className="bg-teal-500 hover:bg-teal-600 border-2 border-primary"
            >
              Try SimpleGen
            </Button>
          </Link>
          <ModeToggle />
        </nav>

        <div className="flex items-center gap-4 md:hidden">
          <Link href="/dashboard">
            <Button
              size="sm"
              className="bg-teal-500 hover:bg-teal-600 border-2 border-primary hidden sm:block"
            >
              Try SimpleGen
            </Button>
          </Link>

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
              transition={{ type: "spring", stiffness: 300, damping: 35 }}
              className="fixed inset-0 bg-secondary z-50 flex justify-center items-center min-h-screen"
            >
              <button
                className="absolute top-6 right-6 text-white"
                onClick={() => setOpen(false)}
              >
                <X size={28} />
              </button>
              <motion.div className="flex flex-col gap-6 items-center text-base sm:text-lg md:text-xl lg:text-2xl">
                <Link href="/blog" onClick={() => setOpen(false)}>
                  Blog
                </Link>
                <Link href="/tools" onClick={() => setOpen(false)}>
                  Tools
                </Link>
                <Link href="/subscribe" onClick={() => setOpen(false)}>
                  Subscribe
                </Link>
                <Link href="/sign-in" onClick={() => setOpen(false)}>
                  Login
                </Link>
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="bg-teal-500 hover:bg-teal-600 border-2 border-primary block sm:hidden"
                  >
                    Try SimpleGen
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
