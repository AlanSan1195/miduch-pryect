import { SanstreamLyout, SanstreamLyoutPerfil } from "./SanstreamLyout";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { RecommendedChannels } from "./RecommendedChannels";
import { LivesChannels, OthersChannels } from "./Channels";
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
  if (!user) {
    return <p>Error: El usuario no está definido.</p>;
  }
  return (
    <SanstreamLyoutPerfil>
        <RecommendedChannels/>
        <PerfilUser user ={user}/>
        <Footer/>
    </SanstreamLyoutPerfil>
  );
}
