"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function ComingSoonPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true });

  // Calculate countdown to launch date (30 days from now)
  useEffect(() => {
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = launchDate.getTime() - now.getTime();

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Floating animation for background elements
  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 5,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse" as const,
      ease: "easeInOut",
    },
  };

  // Text animation variants
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const letterVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  // Handle form submission
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // Here you would typically send the email to your backend
    }
  };

  // Create animated background dots
  const createDots = () => {
    const dots = [];
    for (let i = 0; i < 20; i++) {
      const size = Math.random() * 10 + 5;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const delay = Math.random() * 5;

      dots.push(
        <motion.div
          key={i}
          className="absolute rounded-full bg-teal-500/20"
          style={{
            width: size,
            height: size,
            left: `${x}%`,
            top: `${y}%`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 0.8, 1],
            opacity: [0, 0.8, 0.5, 0],
            y: [0, -50],
          }}
          transition={{
            duration: 8,
            delay: delay,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        />
      );
    }
    return dots;
  };

  // Split text for letter animation
  const titleText = "COMING SOON";
  const titleLetters = titleText.split("");

  return (
    <div className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-background text-foreground">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">{createDots()}</div>

      <motion.div
        className="absolute top-20 right-20 h-40 w-40 rounded-full bg-teal-700/30 blur-3xl"
        initial={{ y: 0 }}
        animate={floatingAnimation}
      />
      <motion.div
        className="absolute bottom-20 left-20 h-60 w-60 rounded-full bg-teal-500/20 blur-3xl"
        initial={{ y: 0 }}
        animate={{
          y: [0, -20, 0],
          transition: {
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse" as const,
            delay: 1,
          },
        }}
      />

      <div className="z-10 flex w-full max-w-4xl flex-col items-center px-4">
        {/* Animated title */}
        <motion.h1
          ref={titleRef}
          className="mb-8 flex text-center text-5xl font-bold tracking-wider sm:text-7xl"
          variants={titleVariants}
          initial="hidden"
          animate={isTitleInView ? "visible" : "hidden"}
        >
          {titleLetters.map((letter, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className="inline-block"
            >
              {letter === " " ? <span>&nbsp;</span> : letter}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle with reveal animation */}
        <motion.p
          className="mb-12 max-w-xl text-center text-lg text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          We're working on something amazing. Our new website will be ready soon
          with exciting features and a brand new experience.
        </motion.p>

        {/* Countdown timer */}
        <motion.div
          className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2, duration: 0.5, type: "spring" }}
        >
          {Object.entries(countdown).map(([unit, value]) => (
            <motion.div
              key={unit}
              className="flex flex-col items-center rounded-lg bg-card p-4 backdrop-blur-sm group border-2"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(20, 184, 166, 0.2)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={value}
                  className="text-4xl font-bold text-teal-400"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {value}
                </motion.span>
              </AnimatePresence>
              <span className="mt-2 text-sm uppercase text-secondary dark:text-white group-hover:text-black dark:group-hover:text-white">
                {unit}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Newsletter signup form with animation */}
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-2"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="border-input bg-card/50 text-foreground placeholder:text-muted-foreground"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="submit"
                    className="bg-teal-600 text-primary-foreground hover:bg-teal-700"
                    variant="outline"
                  >
                    Notify Me
                  </Button>
                </motion.div>
              </motion.form>
            ) : (
              <motion.div
                className="rounded-md bg-teal-600/20 p-4 text-center text-teal-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="mb-2 text-2xl"
                >
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{
                      delay: 0.5,
                      duration: 0.5,
                      ease: "easeInOut",
                      times: [0, 0.3, 0.6, 1],
                    }}
                    className="inline-block"
                  >
                    ✓
                  </motion.span>
                </motion.div>
                Thanks! We'll notify you when we launch.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Social media links with hover animations */}
        <motion.div
          className="mt-12 flex space-x-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.8 }}
        >
          {["twitter", "instagram", "facebook"].map((social) => (
            <motion.a
              key={social}
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="sr-only">{social}</span>
              <div className="h-6 w-6 rounded-full bg-secondary" />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Animated progress bar at bottom */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-teal-600 via-teal-400 to-teal-600"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{
          duration: 8,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
    </div>
  );
}
