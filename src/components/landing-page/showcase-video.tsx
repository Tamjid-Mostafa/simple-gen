"use client";

import { MotionValue, motion, useScroll, useTransform } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { Hero } from "./hero";

export function ShowcaseVideo() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const scaleX = useTransform(
    scrollYProgress,
    [0, 0.3],
    [1.05, isMobile ? 1 : 1.15]
  );
  const scaleY = useTransform(
    scrollYProgress,
    [0, 0.3],
    [0.96, isMobile ? 1 : 1.1]
  );
  const rotate = useTransform(scrollYProgress, [0, 0.12], [20, 0]);
  const translate = useTransform(scrollYProgress, [0, 0.8], [0, 400]);
  return (
    <div
      ref={ref}
      className="pb-[32rem] [perspective:800px] md:px-40 px-12 flex flex-col items-center overflow-hidden"
    >
      <Hero />
      {/* <ShowCaseVideoSection
        // src={src}
        scaleX={scaleX}
        scaleY={scaleY}
        rotate={rotate}
        translate={translate}
      /> */}
      <motion.div
        style={{
          scaleX,
          scaleY,
          rotateX: rotate,
          translateY: translate,
          transformStyle: "preserve-3d",
          transformOrigin: "top",
        }}
        className="w-full md:max-w-4xl max-w-md mt-4 mx-auto h-[16rem] md:h-[32rem] lg:h-[40rem] md:w-full border-4 border-[#6C6C6C] p-2 md:p-6 bg-[#222222] rounded-[30px] shadow-[0_0_0_rgba(0,0,0,0.3),0_9px_20px_rgba(0,0,0,0.29),0_37px_37px_rgba(0,0,0,0.26),0_84px_50px_rgba(0,0,0,0.15),0_149px_60px_rgba(0,0,0,0.04),0_233px_65px_rgba(0,0,0,0.01)]"
      >
        <div className="h-full w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/ZK-rNEhJIDs"
            title="Welcome Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className="rounded-md"
          />
        </div>
      </motion.div>
    </div>
  );
}

const ShowCaseVideoSection = ({
  scaleX,
  scaleY,
  rotate,
  translate,
  src,
}: {
  scaleX: MotionValue<number>;
  scaleY: MotionValue<number>;
  rotate: MotionValue<number>;
  translate: MotionValue<number>;
  src?: string;
}) => {
  return (
    <motion.div
      style={{
        scaleX,
        scaleY,
        rotateX: rotate,
        translateY: translate,
        transformStyle: "preserve-3d",
        transformOrigin: "top",
      }}
      className="hidden md:block w-[92vw] md:max-w-5xl mt-4 mx-auto h-[16rem] md:h-[32rem] lg:h-[40rem] md:w-full border-4 border-[#6C6C6C] p-2 md:p-6 bg-[#222222] rounded-[30px] shadow-[0_0_0_rgba(0,0,0,0.3),0_9px_20px_rgba(0,0,0,0.29),0_37px_37px_rgba(0,0,0,0.26),0_84px_50px_rgba(0,0,0,0.15),0_149px_60px_rgba(0,0,0,0.04),0_233px_65px_rgba(0,0,0,0.01)]"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/ZK-rNEhJIDs"
          title="Welcome Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          className="rounded-md"
        />
      </div>
    </motion.div>
  );
};
