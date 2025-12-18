import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetHomePageQuery } from "../../services/homePageApi/homePageApi";
import { Loader2 } from "lucide-react";

function Slider() {
  const { isLoading, data } = useGetHomePageQuery();
  const [index, setIndex] = useState(0);

  const slides = data?.Slider || [];

  useEffect(() => {
    //useEffect with a variable dependency array - runs on mount , every time the variable changes
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval); //unmounting time - stops the interval
  }, [slides.length]); //when slides.length changes, it will mount the useEffect again and this time slides.length!=0. so, interval starts

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="w-10 h-10 text-pink-600 animate-spin" />
      </div>
    );
  }

  return (
    <div
      className="
      relative
      w-full
      h-[42vh]        /* mobile height */
      sm:h-[50vh]
      md:h-[520px]    /* desktop height */
      overflow-hidden
    "
    >
      <AnimatePresence mode="wait">
        {/* mode wait = Waits for the current image to finish exiting , Only then shows the next image */}
        {/* animates a slider image so that when the slide changes, the old image exits and the new image enters smoothly */}
        <motion.img
          key={slides[index]?.id} //when index changes, key chnages - AnimatePresence detects this and runs exit + enter animations. Without key, animation won’t work correctly.
          src={slides[index]?.uri} //img[index]
          alt="banner"
          className="
          w-full
          h-full
          object-cover     /* MOBILE SAFE */
          md:object-cover    /* DESKTOP CROPPING */
        "
          initial={{ opacity: 0, x: 120 }} //animatiom from right to left
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -120 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        />
      </AnimatePresence>
    </div>
  );
}

export default Slider;
