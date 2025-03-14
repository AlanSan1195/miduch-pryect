import { useState } from "react";
import {RecommendedChannels} from "./RecommendedChannels";
import {LivesChannels} from "./LivesChannels";


export function SanstreamLyout() {
  const [isVisible, setIsVisible] = useState(true); // Estado compartido

  return (
    <div className="flex  ">
      <div className=" fixed z-00  ">

      <RecommendedChannels visible={isVisible} setVisible={setIsVisible} />
      </div>
      <div className=" ml-60">
      <LivesChannels  visible={isVisible} />

      </div>
    </div>
  );
}
