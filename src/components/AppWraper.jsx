import { SanstreamLyout } from "./SanstreamLyout";
import { Header } from "./Header";
import { RecommendedChannels } from "./RecommendedChannels";
import { LivesChannels } from "./LivesChannels";
import { PerfilUser } from "./Perfiles";

export function AppWraper() {
  return (
    <SanstreamLyout>
        <RecommendedChannels/>
        <LivesChannels/>
    </SanstreamLyout>
  );
}
export function AppWraperPerfil({user}) {
  return (
    <SanstreamLyout>
      <Header/>
        <RecommendedChannels/>
        <LivesChannels/>
        <PerfilUser user ={user}/>
    </SanstreamLyout>
  );
}
