"use client";

import { useEffect, useMemo, useState } from "react";
import { animate } from "framer-motion";

export function useAnimatedNumber(value: number, duration = 0.35) {
  const [display, setDisplay] = useState(value);

  const safe = useMemo(() => (Number.isFinite(value) ? value : 0), [value]);

  useEffect(() => {
    const controls = animate(display, safe, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(v),
    });

    return () => controls.stop();
  }, [safe]);

  return display;
}
