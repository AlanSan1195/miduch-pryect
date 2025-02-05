import { useEffect, useState } from "react";
import {url, CLIENT_ID, TOKEN_API} from "../services/apiTwitch";




export function RecommendedChannels() {
  const [enabled, setEnabled] = useState(false);
  useEffect(()=>{


  },[])
  return(
    <div
      id="recomended"
      className=" border-2 border-black w-[250px] min-h-dvh text-xs flex flex-col  items-center"
    >
      <h2 className=" font-semibold m-2">RECOMENDADED CHANNELS</h2>
    </div>
  );
}
