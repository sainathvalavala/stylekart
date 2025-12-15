import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetHomePageQuery } from "../services/HomePageApi/HomePageApi";

function Slider() {
  const { isLoading, data } = useGetHomePageQuery();
  const [index, setIndex] = useState(0);

  const slides = data?.Slider || [];

  useEffect(() => {
    if (!slides.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h2 className="text-xl">Loading...</h2>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-[70vh] md:h-[520px]
"
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={slides[index]?.id}
          src={slides[index]?.uri}
          alt="banner"
          className="w-full h-full object-cover"
          initial={{ opacity: 0, x: 120 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -120 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        />
      </AnimatePresence>
    </div>
  );
}

export default Slider;
