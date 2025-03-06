import { CLIENT_ID, TOKEN_API } from "../services/apiTwitch";
import { useEffect, useState } from "react";

export function PerfilUser({ user }) {
  const [streamLive, setStreamerLive] = useState(null);
  const [videos, setVideos] = useState([]);
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

      // obtener videos grabados de los streamers
      const videosData = await fetch(
        `https://api.twitch.tv/helix/videos?user_id=${idUser}&type=archive`,
        { headers }
      );
      if (!videosData.ok) {
        return null;
      }
      const videos = await videosData.json();
      console.log(videos);
      setVideos(videos.data || []);

      const fullDta = {
        ...data.data[0],
        ...dataInfo.data[0],
        ...videos.data[0],
      };
      console.log(fullDta);
      setStreamerLive(fullDta);

      return fullDta;
    };
    streamLive();
  }, [user]);
  return (
    <div className="flex flex-col h-full w-full gap-y-4">
      {streamLive ? (
        <>
          <iframe
            className=" flex justify-center mx-auto h-[500px] w-full "
            src={`https://player.twitch.tv/?channel=${user}&parent=localhost`}
          ></iframe>
          <div className="flex flex-col gap-y-2 mx-2 ">
            <div className="flex items-center gap-x-2  border-[2px] border-black shadow-sm shadow-white/10  rounded-md p-2">
              <img
                src={`${streamLive.offline_image_url || user}`}
                alt="Avatar"
                className=" size-20 rounded-full"
              />
              <div className=" flex flex-col text-pretty">
                <h1 className="font-bold text-2xl">
                  {streamLive.display_name || user}
                </h1>
                <h2 className=" text-xs">
                  {streamLive.view_count}{" "}
                  <spam className="font-thin">Espectadores</spam>
                </h2>
                <h2 className=" text-xs">{streamLive.description}</h2>
              </div>
            </div>

            <p className="font-semibold">{streamLive.title || "Sin título"}</p>
            <p className=" font-thin">
              {streamLive.game_name || "Desconocido"}
            </p>
          </div>
          <section>
            <h2 className="text-xl font-bold mx-2">Últimos Streams</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
              {videos.length > 0 ? (
                videos.map((video) => (
                  <div
                    key={video.id}
                    className="  border-[2px] border-black shadow-sm p-2 shadow-white/10 rounded-sm"
                  >
                    <a
                      className="relative"
                      href={video.url}
                      rel="noopener noreferrer"
                    >
                      <img
                        src={video.thumbnail_url
                          .replace("%{width}", "320")
                          .replace("%{height}", "180")}
                        alt={video.title}
                        className="w-full "
                      />
                      <p className="text-xs absolute  top-2 left-2 bg-black/50 text-gray-300 px-1">
                        {video.duration}
                      </p>
                      <p className="text-xs absolute  bottom-2 left-2 bg-black/50 text-gray-300 px-1">
                        {video.view_count}
                        <span>.k vistas</span>
                      </p>
                    </a>
                    <div className="p-2 ">
                      <h1 className="text-sm font-semibold opacity-90 ">
                        {video.title}
                      </h1>

                      <p className=" font-light text-sm opacity-70">
                        {streamLive.display_name}
                      </p>
                      <p className=" font-light text-sm opacity-70">
                        {streamLive.viewable}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No hay videos recientes.</p>
              )}
            </div>
          </section>
        </>
      ) : (
        <p>Buscando al usuario...</p>
      )}
    </div>
  );
}
