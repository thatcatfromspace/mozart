"use client";

import axios from "axios";
import Cookies from "universal-cookie";
import DropdownComponent from "../Dropdown.tsx";
import { useEffect, useState } from "react";
import { playfair, poppins } from "../fonts";

const Dashboard = () => {
  const cookies = new Cookies();
  const [displayName, setDisplayName] = useState("");
  const [displayURL, setDisplayURL] = useState("");
  const [profileURL, setprofileURL] = useState("");

  async function getData() {
    axios
      .get("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${cookies.get("accessToken")}` },
      })
      .then((res) => {
        console.log(res.data);
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
    <div className="[height:100%] [min-height:100vh] bg-alice_blue-400 px-14 py-8">
      <nav className="flex justify-between items-center">
        <div className="flex items-center">
          <span className={`${playfair.className} text-3xl`}> MOZART. </span>
        </div>
        <div className={`py-2 pe-4 ps-10 rounded-full`}>
          <DropdownComponent userName={displayName} userProfile={displayURL} profileURL={profileURL} signOutFunction={signOut} />
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;
