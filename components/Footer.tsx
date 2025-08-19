import { FaLocationArrow } from "react-icons/fa6";

import { socialMedia } from "@/data";
import MagicButton from "./MagicButton";

const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10" id="contact">
      {/* background grid */}
      <div className="w-full absolute left-0 -bottom-72 min-h-96">
        <img
          src="/footer-grid.svg"
          alt="grid"
          className="w-full h-full opacity-50 "
        />
      </div>

      <div className="flex flex-col items-center">
        <p className="heading lg:max-w-[45vw]">
          Why <span className="text-purple md:mt-020">Dandelion?</span> 
        </p>
        <p className="text-white-200 md:mt - 20 my text-center text-2xl">
          
Like a dandelion seed, my design journey begins with observation quiet, patient, and guided by empathy. I believe great design starts with listening, understanding, and seeing the world through others’ eyes.

Each project I create is shaped by the environment it lands in, adapting naturally to the needs of the people it serves. My goal is to design experiences that feel effortless yet meaningful accessible to all, inclusive in every sense, and impactful without overwhelming.

For me, the dandelion represents more than a visual motif. It’s a reminder to be open to where ideas may travel, to grow with intention, and to create work that leaves a lasting, positive mark wherever it lands.
        </p>
        <a href="mailto:arxthy@gmail.com">
          <MagicButton
            title="Let's get in touch"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light">
          Copyright © 2025 Arathy R
        </p>

        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((info) => (
            <div
              key={info.id}
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
            >
              <a
                key={info.id}
                href={info.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={info.img} alt="icons" width={20} height={20} />
                </a>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
