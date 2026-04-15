"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

export function Banner() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="relative w-full h-dvh flex items-center justify-center overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-500">
      <div className="relative z-10 w-full flex flex-col items-center justify-center h-full px-2 sm:px-4">
        <motion.div
          className="flex flex-col items-center text-center w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="w-full text-left sm:text-center text-[10vw] md:text-[8vw] font-black tracking-tighter text-slate-900 dark:text-white leading-[0.95] mb-8 lg:mb-12"
          >
            Find Amazing Events <br />
            <span className="text-teal-600">happening in</span>{" "}
            <span className="inline-block align-middle w-[2.2em] h-[0.9em] rounded-full overflow-hidden relative mx-[0.1em] shadow-inner border-[0.08em] border-white dark:border-gray-950">
              <Image
                src="/images/event.jpg"
                alt="Event crowd"
                fill
                className="object-cover"
              />
            </span>
            <br className="hidden md:block" />
            Your{" "}
            <span className="inline-block align-middle w-[2em] h-[0.9em] rounded-full overflow-hidden relative mx-[0.1em] shadow-inner border-[0.08em] border-white dark:border-gray-950">
              <Image
                src="/images/event2.jpg"
                alt="Speaker"
                fill
                className="object-cover"
              />
            </span>
            city.
          </motion.h1>

          {/* Button */}
          {/* <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="h-14 md:h-16 px-8 md:px-10 text-base md:text-lg bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-gray-200 text-white dark:text-slate-900 rounded-full transition-all duration-300 group"
            >
              <span className="flex items-center gap-4 font-bold tracking-wide">
                Get Ticket
                <span className="w-8 md:w-12 h-0.5 bg-white dark:bg-slate-900 opacity-50 block group-hover:w-16 transition-all duration-300"></span>
              </span>
            </Button>
          </motion.div> */}
        </motion.div>
      </div>
    </section>
  );
}
