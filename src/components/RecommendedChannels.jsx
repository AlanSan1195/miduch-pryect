import { awaitStream, awaitYourFollows } from "../logic/respuesta";
import { useEffect, useState } from "react";
import { ShowmoreWhitActive } from "./Showmore";
import { TooltipColapsar, TooltipExpandir } from "./Tooltip";
import { useInitialContext } from "./SanstreamLyout";

export function RecommendedChannels() {
  const { context: isActive, setContext: setIsActive } = useInitialContext();
  const [isShow, setShow] = useState(false);
  const [isShowing, setIsShowing] = useState(false);
  const [streamer, setStreamer] = useState([]);
  const [yourFollows, setYourFollows] = useState([]);

  useEffect(() => {
    async function geStream() {
      // Obtener datos de los streams recomendados y los que sigues
      const data = await awaitStream();
      setStreamer(data);
      const dataFollws = await awaitYourFollows();
      setYourFollows(dataFollws);
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
      className={`  h-screen bg-primary fixed inset-0  top-20 border-r-[2px] border-black shadow-sm shadow-white/10  text-xs flex flex-col   ${
        isActive ? "w-60" : "w-20"
      } `}
    >
      {/* //RECOMEND CHANNELS */}
      <div id="svg"
        className={` mt-2 mb-2  ${
          isActive ? "flex ml-3" : "flex justify-between items-center absolute"
        }`}
      >
        <span
          className={`${
            isActive
              ? "flex font-bold mx-2 mt-2 text-[15px] opacity-80"
              : "hidden"
          }`}
        >
          RECOMENDADED CHANNELS
        </span>
        <div
          className={`flex group mr-6 relative  ${
            isActive ? "flex mt-2 mb-3 mr-4" : "rotate-180 mt-2 mb-3 ml-7"
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
            className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left-pipe hover:bg-white/10 hover:rounded-md hover:cursor-pointer"
            onClick={hidden}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M7 6v12"></path>
            <path d="M18 6l-6 6l6 6"></path>
          </svg>
          <div className=" overflow-visible absolute z-50">
            {isActive ? <TooltipColapsar /> : <TooltipExpandir />}
          </div>
        </div>
      </div>

      <div id="channels-recommended"
        className={` flex-col   ${isActive ? " " : " mt-16  "} ${
          isShow ? "  h-[635px] overflow-y-scroll  " : " h-[310px] overflow-hidden "
        }`} // Altura dinámica basada en isActive
      >
        {streamer.map((stream) => (
          <div
            key={stream.title}
            className="flex p-1 cursor-pointer hover:bg-white/10 rounded-md justify-center"
          >
            <a
              href={`/perfiles/${stream.user_name}`}
              className="flex items-center"
            >
              <img
                className="size-10 rounded-full"
                src={`https://unavatar.io/${stream.user_name}`}
                alt={stream.user_name}
              />
              <div
                className={`${
                  isActive
                    ? "ml-1 w-40 flex justify-between items-center"
                    : "hidden"
                }`}
              >
                <div className="flex items-center text-pretty">
                  <div className="flex-col">
                    <h2 className="font-bold opacity-80">{stream.user_name}</h2>
                    <p className="font-light opacity-70 text-pretty">
                      {stream.game_name}
                    </p>
                  </div>
                </div>
                <div className="size-2 bg-cyan-700 rounded-full mr-1">{""}</div>
              </div>
            </a>
          </div>
        ))}
      </div>

      <ShowmoreWhitActive
        showMore={showMore}
        isActive={isActive}
        isShow={isShow}
      />
      <div className={` h-auto      ${isShow ? "h-full overflow-y-scroll  " : "  h-full overflow-hidden "} `}>
      {yourFollows.map((follow) => (
          <div
            key={follow.id}
            className="flex p-1 cursor-pointer hover:bg-white/10 rounded-md justify-center"
          >
            <a
              href={`/perfiles/${follow.broadcaster_login}`}
              className="flex items-center"
            >
              <img
                className="size-10 rounded-full"
                src={`${follow.profile_image_url}`}
                alt={follow.broadcaster_login}
              />
              <div
                className={`${
                  isActive
                    ? "ml-1 w-40 flex justify-between items-center"
                    : "hidden"
                }`}
              >
                <div className="flex items-center text-pretty">
                  <div className="flex-col">
                    <h2 className="font-bold opacity-80">
                      {follow.broadcaster_login}
                    </h2>
                    <p className="font-light opacity-70 text-pretty">
                      {follow.game_name}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </div>

        ))}
      </div>
     
    
    </div>
  );
}
