import { CLIENT_ID, TOKEN_API } from "../services/apiTwitch";
import { useEffect, useState } from "react";

export function PerfilUser({ user }) {
  const [streamLive, setStreamerLive] = useState(null);
  useEffect(() => {
    const streamLive = async () => {
      //headers
      const headers = {
        "Client-ID": CLIENT_ID,
        Authorization: `Bearer ${TOKEN_API}`,
      };

      const responseUser = await fetch(
        `https://api.twitch.tv/helix/users?login=${user}`,
        { headers }
      );

      if (!responseUser.ok) {
        return null;
      }

      const data = await responseUser.json();
      let idUser = data.data[0].id;

      const dataUser = await fetch(
        `https://api.twitch.tv/helix/channels?broadcaster_id=${idUser}`,
        { headers }
      );

      if (!dataUser.ok) {
        return null;
      }
      const dataInfo = await dataUser.json();

      const fullDta = { ...data.data[0], ...dataInfo.data[0] };
      console.log(fullDta);
      setStreamerLive(fullDta);

      return fullDta;
    };
    streamLive();
  }, [user]);
  return (
    <div className="flex flex-col h-screen w-full gap-y-4">
      {streamLive ? (
        <>
          <iframe
            className=" flex justify-center mx-auto h-4/6 w-full "
            src={`https://player.twitch.tv/?channel=${user}&parent=localhost`}
          ></iframe>
          <div className="flex flex-col gap-y-2 ">
            <div className="flex items-center gap-x-2  border-[2px] border-black shadow-sm shadow-white/10  rounded-md p-2">
              <img
                src={`${streamLive.offline_image_url || user}`}
                alt="Avatar"
                className=" size-20 rounded-full"
              />
              <div className=" flex flex-col text-pretty">
              <h1 className="font-bold">{streamLive.display_name || user}</h1>
              <h2 className=" text-xs">{streamLive.description}</h2>
              </div>
            </div>

            <p>{streamLive.title || "Sin título"}</p>
            <p>{streamLive.game_name || "Desconocido"}</p>
          </div>
        </>
      ) : (
        <p>El usuario no está en vivo o no existe.</p>
      )}
    </div>
  );
}
