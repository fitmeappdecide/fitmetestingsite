import { motion } from "motion/react";
import platformImage from "@/assets/platform.png";
import phoneTryonImage from "@/assets/phone-tryon.png";
import section2Image from "@/assets/section-2.png";
import storeMyntra from "@/assets/myntrat.png";
import storeAjio from "@/assets/ajiot.png";
import storeAmazon from "@/assets/amazont.png";
import storeHm from "@/assets/h&mt.png";
import storeNykaa from "@/assets/nykaat.png";
import storeMeesho from "@/assets/meeshot.png";

const stores = [
  { name: "Myntra", src: storeMyntra },
  { name: "AJIO", src: storeAjio },
  { name: "Amazon", src: storeAmazon },
  { name: "H&M", src: storeHm },
  { name: "Nykaa Fashion", src: storeNykaa },
  { name: "Meesho", src: storeMeesho },
];

export function TryFromStores() {
  return (
    <section className="relative overflow-hidden bg-[#EBE3DB] py-14 sm:py-16 md:py-24 lg:py-28 border-t border-foreground/5">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 md:px-10 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-10 sm:gap-12 lg:grid-cols-[1.1fr_1.3fr] xl:gap-16">
          {/* Left Column: Headline, Copy, Store Badges, and section-2.png directly below icons */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-start"
          >
            {/* Headline */}
            <h2 className="font-serif text-[clamp(2.2rem,6vw,4.2rem)] font-light leading-[1.06] tracking-tight text-foreground">
              Try From Your
              <br />
              <em className="font-normal italic text-primary">Favorite</em> Stores
            </h2>

            {/* Subtitle */}
            <p className="mt-3 sm:mt-4 max-w-md text-sm sm:text-base leading-relaxed text-foreground/65">
              Paste a link from any of these stores and see it on you.
            </p>

            {/* 6 Store Cards Grid */}
            <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-2.5 sm:gap-3 w-full max-w-[290px]">
              {stores.map((store) => (
                <div
                  key={store.name}
                  className="rounded-2xl bg-white p-2.5 sm:p-3 shadow-[0_2px_8px_rgba(0,0,0,0.03)] border border-black/[0.04] flex items-center justify-center aspect-[1.15/1] transition-transform hover:scale-105"
                >
                  <img
                    src={store.src}
                    alt={store.name}
                    className="max-h-[82%] max-w-[82%] object-contain"
                  />
                </div>
              ))}
            </div>

            {/* 3-Step Feature Process Card - section-2.png image asset placed directly below store icons */}
            <div className="mt-6 sm:mt-8 w-full max-w-full sm:max-w-[540px] overflow-hidden transition-transform hover:scale-[1.01]">
              <img
                src={section2Image}
                alt="Paste any product link, AI finds the product, Try it on you"
                className="w-full h-auto object-contain drop-shadow-sm"
              />
            </div>
          </motion.div>

          {/* Right Column: 2 Phones Interactive Step Flow */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex items-center justify-center lg:justify-end w-full"
          >
            <div className="relative w-full max-w-full sm:max-w-[620px]">
              {/* Step Labels & Curved Dashed Arrow */}
              <div className="mb-4 flex items-center justify-between px-2 sm:px-10 text-xs sm:text-sm font-medium text-foreground/75">
                <span>1. Find Your Look</span>
                <svg
                  className="hidden sm:block h-5 w-24 text-foreground/35"
                  viewBox="0 0 100 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M 5,18 Q 50,4 90,12"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    strokeLinecap="round"
                  />
                  <polyline
                    points="83,6 92,12 85,18"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>2. See It On You</span>
              </div>

              {/* 2 Phones Side by Side */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-6 items-center w-full">
                {/* Phone 1: Find Your Look */}
                <div className="relative transition-transform hover:scale-[1.02] flex items-center justify-center">
                  <img
                    src={platformImage}
                    alt="1. Find Your Look on H&M store"
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Phone 2: See It On You */}
                <div className="relative transition-transform hover:scale-[1.02] flex items-center justify-center">
                  <img
                    src={phoneTryonImage}
                    alt="2. See It On You with FitMe AI try-on"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
