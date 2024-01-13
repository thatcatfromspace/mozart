"use client";

import axios from "axios";
import Image from "next/image";
import Cookies from "universal-cookie";
import { useEffect, useRef, useState } from "react";
import { notoSans, poppins } from "../components/fonts";

const Player = () => {
  const isPlaying = useRef(false);
  const isPaused = useRef(false);
  const effectHasRan = useRef(false);
  const [songHasEnded, setSongHasEnded] = useState(false);
  const [currentTrackData, setCurrentTrackData] = useState({
    trackArtist: "",
    trackAlbum: "",
    trackName: "",
    trackAlbumArt: "",
    progress: 0,
    timestamp: 0
  });

  const cookies = new Cookies();
  const accessToken = cookies.get("accessToken");

  const songTimeOutFunction = () => {
    setTimeout(() => {
      setSongHasEnded(true);
    }, 10000);
  };

  const playNextSong = () => {
    axios
      .post("https://api.spotify.com/v1/me/player/next", null, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then(() => {
        setSongHasEnded(true);
      });
  };

  const playPreviousSong = () => {
    axios
      .post("https://api.spotify.com/v1/me/player/previous", null, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then(() => {
        setSongHasEnded(true);
      });
  };

  useEffect(() => {
    function fetchPlaybackDataFromSpotify() {
      axios
        .get("https://api.spotify.com/v1/me/player/currently-playing", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => {
          if (res.data === "") {
            isPlaying.current = false;
          } else {
            isPlaying.current = true;
            res.data.is_playing === "true"
              ? (isPaused.current = true)
              : (isPaused.current = false);
            setSongHasEnded(false);
            setCurrentTrackData({
              ...currentTrackData,
              trackArtist: res.data.item.album.artists[0].name,
              trackAlbum: res.data.item.album.name,
              trackName: res.data.item.name,
              trackAlbumArt: res.data.item.album.images[2].url,
              progress: res.data.progress_ms,
              timestamp: res.data.timestamp
            });
          }
          songTimeOutFunction();
        });
    }
    function postDataToDatabase() {
      axios.post(`http://localhost:3000/api/streams/${cookies.get("uid")}`, {
        progress: currentTrackData.progress,
        timestamp: currentTrackData.timestamp,
        track: currentTrackData.trackName,
        album: currentTrackData.trackAlbum,
        artist: currentTrackData.trackArtist,
        album_thumbnail_url: currentTrackData.trackAlbumArt,
      });
    }
    if (!effectHasRan.current) {
      /* prevent useEffect from running twice, remove for prod */
      fetchPlaybackDataFromSpotify();
      postDataToDatabase();
      effectHasRan.current = true;
    } else {
      effectHasRan.current = false;
    }
  }, [songHasEnded]);

  return (
    <div className=" bg-alice_blue-500/40 flex justify-stretch items-center mt-16 h-[60px] px-5 rounded-full">
      <div className="flex">
        <div>
          <svg
            fill="black"
            viewBox="0 0 16 16"
            height="25px"
            width="25px"
            className="me-5 cursor-pointer"
            onClick={playPreviousSong}
          >
            <path d="M.5 3.5A.5.5 0 000 4v8a.5.5 0 001 0V8.753l6.267 3.636c.54.313 1.233-.066 1.233-.697v-2.94l6.267 3.636c.54.314 1.233-.065 1.233-.696V4.308c0-.63-.693-1.01-1.233-.696L8.5 7.248v-2.94c0-.63-.692-1.01-1.233-.696L1 7.248V4a.5.5 0 00-.5-.5z" />
          </svg>
        </div>
        <div>
          {!isPaused.current ? (
            <svg
              viewBox="0 0 500 1000"
              fill="black"
              height="25px"
              width="25px"
              className="me-5 cursor-pointer"
            >
              <path d="M486 474c9.333 6.667 14 15.333 14 26 0 9.333-4.667 17.333-14 24L58 790c-16 10.667-29.667 12.667-41 6-11.333-6.667-17-20-17-40V242c0-20 5.667-33.333 17-40 11.333-6.667 25-4.667 41 6l428 266" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 320 512"
              fill="black"
              height="25px"
              width="25px"
              className="me-5 cursor-pointer"
            >
              <path d="M48 64C21.5 64 0 85.5 0 112v288c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48v288c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48h-32z" />
            </svg>
          )}
        </div>
        <div>
          <svg
            fill="black"
            viewBox="0 0 16 16"
            height="25px"
            width="25px"
            className="me-5 cursor-pointer"
            onClick={playNextSong}
          >
            <path d="M15.5 3.5a.5.5 0 01.5.5v8a.5.5 0 01-1 0V8.753l-6.267 3.636c-.54.313-1.233-.066-1.233-.697v-2.94l-6.267 3.636C.693 12.703 0 12.324 0 11.693V4.308c0-.63.693-1.01 1.233-.696L7.5 7.248v-2.94c0-.63.693-1.01 1.233-.696L15 7.248V4a.5.5 0 01.5-.5z" />
          </svg>
        </div>
      </div>
      <div>
        {isPlaying.current ? (
          <div className="flex items-center">
            <Image
              src={currentTrackData.trackAlbumArt}
              height={50}
              width={50}
              className="rounded-lg me-5"
              alt={`${currentTrackData.trackAlbum}`}
            />
            <div>
              <p className={`${notoSans.className} font-medium`}>
                {currentTrackData.trackName}
              </p>
              <p className={`${notoSans.className} font-normal`}>
                {currentTrackData.trackArtist}
              </p>
            </div>
          </div>
        ) : (
          <div className={`${poppins.className} overflow-clip`}>
            Play something on Spotify for it to show up here!
          </div>
        )}
      </div>
    </div>
  );
};

export default Player;
