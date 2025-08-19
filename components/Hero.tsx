import { FaLocationArrow } from "react-icons/fa6";
import MagicButton from "./MagicButton";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";

const Hero = () => {
  return (
    <div className="relative pt-36 pb-20 overflow-visible" id="hero">
      {/* Spotlights behind everything */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full"
          fill="purple"
        />
        <Spotlight
          className="left-80 top-28 h-[80vh] w-[50vw]"
          fill="blue"
        />
      </div>

      {/* Grid behind video */}
      <div
        className="
          absolute -inset-[12%] z-0 pointer-events-none
          dark:bg-grid-white/[0.06] bg-grid-black-100/[0.12]
        "
      />

      {/* ===== Video section (in normal flow) ===== */}
      <div className="relative z-10 mt-[5rem] h-[60vh] w-full">
        {/* Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/Hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Text overlay on top of video */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center">
            <p className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
              Every idea starts with a seed
            </p>

            <TextGenerateEffect
              words="Let's Begin the Journey"
              className="text-center text-[40px] md:text-5xl lg:text-6xl"
            />

            <p className="text-center md:tracking-wider mt-2 text-sm md:text-lg lg:text-2xl">
              Arathy | Product Designer & Developer
            </p>
          </div>
        </div>
      </div>

      {/* ===== Button below the video ===== */}
      <div className="relative z-20 flex justify-center mt-6">
        <a href="#about">
          <MagicButton
            title="Show my work"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>
    </div>
  );
};

export default Hero;
