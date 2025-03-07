import { awaitStream, awaitYourFollows } from "../logic/respuesta";
import { useEffect, useState } from "react";
import { ShowmoreWhitActive } from "./Showmore";
import { TooltipColapsar, TooltipExpandir } from "./Tooltip";

export function RecommendedChannels({ visible = true }) {
  const [isActive, setIsActive] = useState(visible);
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
      className="border-r-[2px] border-black shadow-sm shadow-white/10 h-full text-xs flex flex-col overflow-y-auto overflow-x-hidden w-auto "
    >
      {/* //RECOMEND CHANNELS */}
      <div className={`${isActive ? "flex":  "flex justify-between items-center absolute"}`}>
        <span
          className={`${isActive ?  "flex font-bold mx-2 mt-2 text-[15px] opacity-80": "hidden"}`}
        >
          RECOMENDADED CHANNELS
        </span>
        <div
          className={`flexgroup mr-6  ${isActive ?"flex mt-2 mb-3 mr-4" :"rotate-180 mt-2 mb-3 ml-4" }`}
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
          {isActive ?  <TooltipColapsar />: <TooltipExpandir /> }
        </div>
      </div>
  

        <div
          className={`${
            isActive ? " " : " mt-11 "
          } ${isShow ? "  h-[480px] overflow-y-hidden": " h-48 overflow-y-hidden"}`} // Altura dinámica basada en isActive
        >
          {streamer.map((stream) => (
            <div key={stream.title} className="flex p-1 cursor-pointer hover:bg-white/10 rounded-md justify-center">
              <a href={`/perfiles/${stream.user_name}`} className="flex items-center">
                <img
                  className="size-10 rounded-full"
                  src={`https://unavatar.io/${stream.user_name}`}
                  alt={stream.user_name}
                />
                <div className={`${isActive ? "ml-1 w-40 flex justify-between items-center" :"hidden" }`}>
                  <div className="flex items-center text-pretty">
                    <div className="flex-col">
                      <h2 className="font-bold opacity-80">{stream.user_name}</h2>
                      <p className="font-light opacity-70 text-pretty">{stream.game_name}</p>
                    </div>
                  </div>
                  <div className="size-2 bg-cyan-700 rounded-full mr-1">
                    {""}
                  </div>
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
  
      <div className={`  ${isActive ? "h-auto" : ""}`}>
        {yourFollows.map((follow) => (
          <div key={follow.id} className="flex p-1 cursor-pointer hover:bg-white/10 rounded-md justify-center">
          <a href={`/perfiles/${follow.broadcaster_login}`} className="flex items-center">
            <img
              className="size-10 rounded-full"
              src={`https://unavatar.io/${follow.broadcaster_name}`}
              alt={follow.broadcaster_login}
            />
            <div className={`${isActive ? "ml-1 w-40 flex justify-between items-center" :"hidden" }`}>
              <div className="flex items-center text-pretty">
                <div className="flex-col">
                  <h2 className="font-bold opacity-80">{follow.broadcaster_login}</h2>
                  <p className="font-light opacity-70 text-pretty">{follow.game_name}</p>
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
