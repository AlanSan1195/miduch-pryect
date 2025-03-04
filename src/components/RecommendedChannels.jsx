import { awaitStream } from "../logic/respuesta";
import { useEffect, useState } from "react";
import {ShowmoreWhitActive } from "./Showmore";
import { TooltipColapsar, TooltipExpandir } from "./Tooltip";

export function RecommendedChannels() {
  const [isActive, setIsActive] = useState(false);
  const [isShow, setShow] = useState(false);
  const [streamer, setStreamer] = useState([]);
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    async function geStream() {
      const data = await awaitStream();
      setStreamer(data);
    }

    geStream();
  }, []);
  function hidden() {
    setIsActive(!isActive);
  }
  function showMore() {
    setShow(!isShow);
    setIsShowing(!isShowing);
  }

  return (
    <div
      id="recomended"
      className={` border-r-[2px] border-black shadow-sm shadow-white/10  h-screen text-xs flex flex-col overflow-y-auto overflow-x-hidden w-auto`}
    >
      {/* //RECOMEND CHANNELS */}
      <div
        className={`${
          isActive ? "flex justify-between items-cente absolute" : "flex"
        }`}
      >
        <span
          className={`${
            isActive
              ? "hidden "
              : "flex font-bold  mx-2 mt-2 text-[15px] opacity-80"
          }`}
        >
          RECOMENDADED CHANNELS
        </span>
        <div
          className={` flex items-center group  mr-6  ${
            isActive ? " rotate-180 mt-2 mb-3 ml-3  " : " flex mt-2 mb-3 mr-4 "
          }`}
        >
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
            className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left-pipe hover:bg-white/10 hover:rounded-md hover:cursor-pointer "
            onClick={hidden}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M7 6v12"></path>
            <path d="M18 6l-6 6l6 6"></path>
          </svg>
          {isActive ? <TooltipExpandir /> : <TooltipColapsar />}
        </div>
      </div>
      <div className={` overflow-y-hidden ${isShow ? "h-full" : ""}`}>
        <div
          className={`  ${
            isActive
              ? " max-h-72 w-full flex flex-col  mt-11   "
              : " max-h-[296px] w-full flex flex-col gap-y-[1.5px]   "
          } `}
        >
          {streamer.map((stream) => (
            <div
              key={stream.title}
              className=" flex p-1 cursor-pointer  hover:bg-white/10 rounded-md  "
              onClick={() =>
                window.open(
                  `/perfiles/${stream.user_name}&parent=localhost`
                )
              }
            >
              <a href={`${stream.user_name}`} className="flex items-center">
                <img
                  className={`${
                    isActive ? "size-10  rounded-full" : " size-10 rounded-full"
                  }`}
                  src={`https://unavatar.io/${stream.user_name}`}
                  alt={`https://unavatar.io/${stream.user_name}`}
                />

                <div
                  className={`${
                    isActive
                      ? " hidden "
                      : " ml-1 w-40 flex justify-between  items-center   "
                  }`}
                >
                  <div className=" flex items-center text-pretty ">
                    <div className="flex-col">
                      <h2 className=" font-bold opacity-80">
                        {stream.user_name}
                      </h2>
                      <p className=" font-light opacity-70 text-pretty">
                        {stream.game_name}
                      </p>
                    </div>
                  </div>
                  <div className=" size-2 bg-cyan-700 rounded-full mr-1">
                    {""}
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
      <ShowmoreWhitActive
        showMore={showMore}
        isActive={isActive}
        isShow={isShow}
      />
    </div>
  );
}
