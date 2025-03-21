import { SanstreamLyout, SanstreamLyoutPerfil } from "./SanstreamLyout";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { RecommendedChannels } from "./RecommendedChannels";
import { LivesChannels, OthersChannels } from "./LivesChannels";
import { PerfilUser } from "./Perfiles";

export function AppWraper() {
  return (
    <SanstreamLyout>
        <RecommendedChannels/>
        <LivesChannels/>
        <OthersChannels/>
        <Footer/>
    </SanstreamLyout>
  );
}
export function AppWraperPerfil({user}) {
  return (
    <SanstreamLyoutPerfil>
        <RecommendedChannels/>
        <PerfilUser user ={user}/>
    </SanstreamLyoutPerfil>
  );
}
