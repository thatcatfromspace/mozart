"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Cookies from "universal-cookie";
import { redirectToAuthCodeFlow, getAccessToken } from "./auth";
import { useRouter } from "next/navigation";
import { poppins, playfair } from "../fonts";
import Lottie from "lottie-react";
import astronaut from "../../public/astronaut.json";

const Page = () => {
  const cookies = new Cookies();
  const [spotifyAuthURL, setSpotifyAuthURL] = useState("");
  const [spotifyAccessToken, setSpotifyAccessToken] = useState("");
  const effectRan = useRef(false);
  const router = useRouter();

  useEffect(() => {
    async function getAuth() {
      const clientId = process.env.SPOTIFY_CLIENT_ID;
      let code = "";
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        code = params.get("code");
      }
      if (!code) {
        const authURL = await redirectToAuthCodeFlow(clientId);
        console.log(authURL);
        setSpotifyAuthURL(authURL);
      } else {
        const accessToken = await getAccessToken(clientId, code);
        setSpotifyAccessToken(accessToken);
        cookies.set("accessToken", accessToken, { sameSite: true, path: "/" }); // todo: encrypt accessToken before storage
        router.push("./dashboard");
      }
    }

    if (!effectRan.current) {
      /* prevent useEffect from running twice, remove for prod */
      getAuth();
    }
    return () => (effectRan.current = true);
  }, []);

  return (
    <div className="[height:100%] [min-height:100vh] bg-alice_blue-500 px-14 py-8">
      {!spotifyAccessToken ? (
        <div>
          <div className="flex items-center">
            <span className={`${playfair.className} text-3xl`}> MOZART. </span>
          </div>
          <div className="flex justify-center items-center mt-36">
            <span
              className={`${poppins.className} text-lg flex justify-center w-[40%]`}
            >
              To begin tracking your data, Mozart needs access to your Spotify
              account. Upon clicking the button, you will be redirected to the
              Spotify authorization page.
            </span>
          </div>
          <div className="flex justify-center items-center mt-16">
            <Link href={spotifyAuthURL}>
              <button
                type="button"
                className={`${poppins.className} text-white font-semibold bg-[#1DB954] hover:bg-[#1DB954]/90 focus:ring-4 focus:outline-none focus:ring-[#1DB954]/50 rounded-lg text-md px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1DB954]/55 me-2 mb-2`}
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  height="1em"
                  width="1em"
                >
                  <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm3.669 11.538a.498.498 0 01-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 01-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 01.166.686zm.979-2.178a.624.624 0 01-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 01-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 01.206.858zm.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 11-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 11-.764 1.288z" />
                </svg>
                &nbsp; Sign in with Spotify
              </button>
            </Link>
          </div>
          <div className="flex justify-center items-center mt-10">
            <div className="w-[300px] h-[400px]">
              <Lottie animationData={astronaut} loop={true} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center text-lg">
          "Woohoo! Sign up attempt successful, redirecting..."
        </div>
      )}
    </div>
  );
};

export default Page;
