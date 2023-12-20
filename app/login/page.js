'use client'

import { useEffect, useState } from "react";
import { redirectToAuthCodeFlow, getAccessToken } from "./auth";
import Link from "next/link";
    
const Page = () => {
  const [auth, setAuth] = useState("")
  const setAuthValue = authValue => {
    setAuth(authValue);
  } 

  useEffect(() => {
    async function getAuth() {
      const clientId = process.env.SPOTIFY_CLIENT_ID;
      const params = new URLSearchParams();
      const code = params.get("code");
      if (!code) {
        console.log("Code does not exist.");
        const authURL = await redirectToAuthCodeFlow(clientId);
        console.log(authURL);
        setAuthValue(authURL);
        
      } else {
        const accessToken = await getAccessToken(clientId, code);
        console.log("Access token obtained.");
        console.log(accessToken);
      }
    };
    getAuth();
  }, [])

  return (
    <div className="flex justify-center items-center">
      {!auth? <Link href={auth}><button> LOGIN WITH SPOTIFY </button></Link> : "Logged in. Redirecting..."}
   </div>
  )
};


export default Page;
