import { useEffect, useState } from "react";
import { awaitStream } from "../logic/respuesta";
import { Showmore, ShowmoreWhitActive } from "./Showmore";

export function RecommendedChannels() {
  const [isActive, setIsActive] = useState(false);
  const [isShow, setShow] = useState(false);
  const [streamer, setStreamer] = useState([]);
  const [selectStream, setSelectStream] = useState(null);

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
  }
  return (
    <div
      id="recomended"
      className={` border-r-[2px] border-black shadow-sm shadow-white/10   min-h-dvh text-xs flex flex-col overflow-y-auto ${
        isActive ? "w-16" : "w-[250px] pr-2"
      }`}
    >
      <div className=" flex justify-between items-center">
        <span
          className={`${
            isActive
              ? "hidden"
              : "flex font-bold  mx-2 mt-2 text-[15px] opacity-80"
          }`}
        >
          RECOMENDADED CHANNELS
        </span>
        <div
          className={`${
            isActive ? " rotate-180 mt-2 mb-3 ml-3" : "flex mt-2 mb-3"
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
            className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left-pipe hover:bg-white/10 hover:cursor-pointer "
            onClick={hidden}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M7 6v12"></path>
            <path d="M18 6l-6 6l6 6"></path>
          </svg>
        </div>
      </div>
      <div
        className={`mx-1 overflow-y-hidden ${isShow ? " h-auto " : "max-h-[334px]"}`}
      >
        <div
          className={`${
            isActive
              ? " h-auto w-full flex flex-col gap-y-2  "
              : " h-auto w-full flex flex-col gap-y-1   "
          } `}
        >
          {streamer.map((stream) => (
            <div
              key={stream.title}
              className=" flex items-center cursor-pointer p-1 hover:bg-white/10 rounded-md  "
              onClick={() => {
                setSelectStream(!selectStream);
              }}
            >
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
                    : " ml-1 w-full  flex items-center justify-between"
                }`}
              >
                <div>
                  <h2 className=" font-bold opacity-80">{stream.user_name}</h2>
                  <p className=" font-light opacity-70 text-pretty">
                    {stream.game_name}
                  </p>
                </div>
                <div>
                  <div className=" size-2 bg-red-600 rounded-full">{""}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ShowmoreWhitActive showMore={showMore} isActive={isActive} />
      
    </div>
  );
}
