"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Mask0 from "./Mask0";
import Mask1 from "./Mask1";
import Mask2 from "./Mask2";
import Mask3 from "./Mask3";
import Mask4 from "./Mask4";
import Mask5 from "./Mask5";
import Mask from "./Mask";

export default function LightningFill() {
  const [step, setStep] = useState(0);
  const maxSteps = 6;

  const handleClick = () => {
    setStep((prev) => (prev + 1) % (maxSteps + 1)); // Reset after 6 steps
  };

  const fillOpacity = step / maxSteps; // 0 to 1

  return (
    <>
      {/* Main Vector outline */}
      <Mask />
      {/* Fill Masks */}
      <Mask0 />
      <Mask1 />
      <Mask2 />
      <Mask3 />
      <Mask4 />
      <Mask5 />
    </>
  );
}
