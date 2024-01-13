"use client";

import axios from "axios";
import Cookies from "universal-cookie";
import DropdownComponent from "../components/Dropdown";
import { useEffect, useState } from "react";
import { playfair, poppins, notoSans } from "../components/fonts";
import Player from "./Player";

const DashboardComponent = () => {
  const cookies = new Cookies();
  const [displayName, setDisplayName] = useState("");
  const [displayURL, setDisplayURL] = useState("");
  const [profileURL, setprofileURL] = useState("");
  const [topArtists, setTopArtists] = useState([
    {
      name: "",
      url: "",
    },
    {
      name: "",
      url: "",
    },
    {
      name: "",
      url: "",
    },
    {
      name: "",
      url: "",
    },
    {
      name: "",
      url: "",
    },
  ]);

  const [topAlbums, setTopAlbums] = useState([
    {
      name: "",
      url: "",
    },
    {
      name: "",
      url: "",
    },
    {
      name: "",
      url: "",
    },
    {
      name: "",
      url: "",
    },
    {
      name: "",
      url: "",
    },
  ]);

  async function getData() {
    axios
      .get("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${cookies.get("accessToken")}` },
      })
      .then((res) => {
        setDisplayName(res.data.display_name);
        setDisplayURL(res.data.images[0].url);
        setprofileURL(res.data.external_urls.spotify);
      });
  }
  useEffect(() => {
    async function name() {
      getData();
    }
    name();
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
              <div className="w-80 h-80 mt-10 border border-black">
                {"Artist 1"}
              </div>
              <div className=" grid grid-cols-2 grid-rows-2 mt-10">
                <div className="w-40 border border-black"> {"Artist 2"} </div>
                <div className="w-40 border border-black"> {"Artist 3"} </div>
                <div className="w-40 border border-black"> {"Artist 4"} </div>
                <div className="w-40 border border-black"> {"Artist 5"} </div>
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
