import Image from "next/image";
import girl from "../public/mozart-girl.png";
import Link from "next/link";
import {
  playfair,
  dynalight,
  zeyada,
  satisfy,
  poppins,
  comforterBrush,
} from "./fonts";

export default function Home() {
  const fancyText = [
    "exquisite",
    "immaculate",
    "impeccable",
    "unique",
    "authentic",
    "expressive",
    "versatile",
    "tantalizing",
    "regal",
    "unrivaled",
    "ethereal",
    "opulent",
    "exceptional",
    "mesmeric",
    "classy",
  ];

  const fancyFonts = [dynalight, zeyada, satisfy, comforterBrush];

  return (
    <div className="[height:100%] [min-height:100vh] bg-alice_blue-500 px-14 py-8">
      <nav className="flex justify-between items-center">
        <div className="flex items-center">
          <span className={`${playfair.className} text-3xl`}> MOZART. </span>
        </div>
        <div>
          <span className={`${poppins.className} me-10`}> How it works </span>
          <Link href={"./login"}>
            <button
              className={`${poppins.className} bg-gunmetal-200 text-alice_blue-700 px-5 py-[5px] rounded-full hover:bg-gunmetal-200/70 transition-colors`}
            >
              Login
            </button>
          </Link>
        </div>
      </nav>
      <div className="flex place-self-center justify-center items-center mt-36 px-20">
        <div>
          <div className="flex-col me-56">
            <p className={`${playfair.className} text-6xl`}> Your taste is </p>
            <br />
            <span
              className={`${
                fancyFonts[Math.floor(Math.random() * fancyFonts.length)]
                  .className
              } text-7xl`}
            >
              {" "}
              {fancyText[Math.floor(Math.random() * fancyText.length)]}.{" "}
            </span>
          </div>
          <div
            className={`flex ${poppins.className} text-xl mt-5 overflow-clip`}
          >
            Let the world know about it.&nbsp;
            <span className="flex hover:underline hover:-translate-y-1 transition-transform cursor-pointer overflow-clip">
              <Link href={"./login"}>Try Mozart</Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-arrow-up-right"
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </span>
          </div>
        </div>
        <div>
          <Image
            className="min-w-[400px]"
            src={girl}
            alt="girl listening to music"
            width={512}
            height={512}
            priority
          />
        </div>
      </div>
    </div>
  );
}
