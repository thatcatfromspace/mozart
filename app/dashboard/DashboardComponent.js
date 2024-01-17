"use client";

import axios from "axios";
import Cookies from "universal-cookie";
import DropdownComponent from "../components/Dropdown";
import { useEffect, useRef, useState } from "react";
import { playfair, poppins, notoSans } from "../components/fonts";
import { useImmer } from "use-immer";
import Player from "./Player";

const DashboardComponent = () => {
  const cookies = new Cookies();
  const effectHasRan = useRef(false);
  const [displayName, setDisplayName] = useState("");
  const [displayURL, setDisplayURL] = useState("");
  const [profileURL, setprofileURL] = useState("");


  const [topAlbums, setTopAlbums] = useState([]);

  useEffect(() => {
    function getUserData() {
      const cookies = new Cookies();
      axios
        .get("https://api.spotify.com/v1/me", {
          headers: { Authorization: `Bearer ${cookies.get("accessToken")}` },
        })
        .then((res) => {
          setDisplayName(res.data.display_name);
          setDisplayURL(res.data.images[0].url);
          setprofileURL(res.data.external_urls.spotify);
          cookies.set("uid", res.data.id, {
            sameSite: true,
            path: "./dashboard",
          });
        });
    }

    function getTopArtists() {
      axios
        .get(
          `http://localhost:3000/api/top/artists/${cookies.get("uid")}?count=5`
        )
        .then((res) => {
          setTopArtists([...topArtists, res.data]);
        });
    }
    if (effectHasRan.current == false) {
      /* prevent useEffect from running twice, remove for prod */
      getUserData();
      getTopArtists();
      effectHasRan.current = true;
    } else {
      effectHasRan.current = false;
    }
  }, []);

  const signOut = () => {
    cookies.remove("accessToken");
    if (typeof window !== undefined) {
      window.location.replace("./login");
    }
  };

  return (
    <div className="[height:100%] [min-height:100vh] bg-alice_blue-400 px-14 pt-8">
      <nav className="flex justify-between items-center">
        <div className="flex items-center">
          <span className={`${playfair.className} text-3xl`}> MOZART. </span>
        </div>
        <div className={`py-2 pe-4 ps-10 rounded-full`}>
          <DropdownComponent
            userName={displayName}
            userProfile={displayURL}
            profileURL={profileURL}
            signOutFunction={signOut}
          />
        </div>
      </nav>
      <Player />
      <main>
        <div className="flex justify-start pt-10">
          <div id="top-artists" className="block">
            <span className={`${poppins.className} font-medium`}>
              {"Your top artists"}
            </span>
            <div className={`${notoSans.className} font-normal flex`}>
              <div className="w-80 h-80 mt-10 p-2 border border-black">
                {"YEAHYEAHARTIST"}
              </div>
              <div className=" grid grid-cols-2 grid-rows-2 mt-10">
                <div className="w-40 p-2 border border-black">
                  {"YEAHYEAHARTIST"}
                </div>
                <div className="w-40 p-2 border border-black">
                  {"YEAHYEAHARTIST"}
                </div>
                <div className="w-40 p-2 border border-black">
                  {"YEAHYEAHARTIST"}
                </div>
                <div className="w-40 p-2 border border-black">
                  {"YEAHYEAHARTIST"}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end pt-10">
          <div id="top-artists" className="block">
            <span className={`${poppins.className} font-medium`}>
              {"Your top albums"}
            </span>
            <div className={`${notoSans.className} flex`}>
              <div className="w-80 h-80 mt-10 border border-black">
                {"Album 1"}
              </div>
              <div className=" grid grid-cols-2 grid-rows-2 mt-10">
                <div className="w-40 border border-black"> {"Album 2"} </div>
                <div className="w-40 border border-black"> {"Album 3"} </div>
                <div className="w-40 border border-black"> {"Album 4"} </div>
                <div className="w-40 border border-black"> {"Album 5"} </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardComponent;
