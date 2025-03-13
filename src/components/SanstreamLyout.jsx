import { useState } from "react";
import {RecommendedChannels} from "./RecommendedChannels";
import {LivesChannels} from "./LivesChannels";


export function SanstreamLyout() {
  const [isVisible, setIsVisible] = useState(true); // Estado compartido

  return (
    <div className="flex  ">
      {/* Pasa la función para cambiar la visibilidad */}
      <RecommendedChannels visible={isVisible} setVisible={setIsVisible} />
      <LivesChannels visible={isVisible} />
    </div>
  );
}
