import { SanstreamLyout } from "./SanstreamLyout";
import { Header } from "./Header";
import { RecommendedChannels } from "./RecommendedChannels";
import { LivesChannels } from "./LivesChannels";

export function AppWraper() {
  return (
    <SanstreamLyout>
        <RecommendedChannels/>
        <LivesChannels/>
    </SanstreamLyout>
  );
}
