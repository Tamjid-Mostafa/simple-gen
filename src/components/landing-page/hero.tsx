import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MotionValue, motion } from "motion/react";
import Link from "next/link";

export function Hero({
  textTransform,
  textOpacity,
}: {
  textTransform?: MotionValue<number>;
  textOpacity?: MotionValue<number>;
}) {
  const userData = [
    {
      name: "Caterina",
      img: "/user/cate.png",
    },
    {
      name: "Bayezid Mostafa",
      img: "/user/bayezid.png",
    },
    {
      name: "Nafiul Islam",
      img: "/user/santo.png",
    },
    {
      name: "Aong Chinghla",
      img: "/user/aong.png",
    },
    {
      name: "Camron",
      img: "/user/camron.png",
    },
  ];

  return (
    <motion.section
      style={{
        translateY: textTransform,
        opacity: textOpacity,
      }}
      className="py-12 md:py-16"
    >
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center space-y-4">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter">
            The <span className="text-teal-500">LinkedIn</span> Post <br />{" "}
            Generator That <br /> Works
          </h1>
          <p className="max-w-[700px] text-muted-foreground px-4 md:px-6">
            After reaching 50 million views with it, Creative Studio made
            SimpleGen public — the AI to write posts for LinkedIn.
          </p>
          <Link href="/dashboard">
            <Button className="bg-teal-500 hover:bg-teal-600">
              Try SimpleGen Today
            </Button>
          </Link>

          <div className="flex items-center mt-6">
            <div className="flex -space-x-2">
              {userData.map((u, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white overflow-hidden"
                >
                  <Image
                    src={u?.img}
                    alt={u?.name}
                    width={32}
                    height={32}
                    className="bg-gray-200"
                  />
                </div>
              ))}
            </div>
            <div className="ml-2 flex items-center">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-muted-foreground ml-1">
                from 5.8k reviews
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
