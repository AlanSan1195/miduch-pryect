import { CLIENT_ID, TOKEN_API } from "../services/apiTwitch";
import { useEffect, useState, useRef } from "react";
import { useInitialContext } from "./SanstreamLyout";

export function PerfilUser({ user }) {
  const [streamLive, setStreamerLive] = useState(null);
  const { context: isActive, setContext: setIsActive } = useInitialContext();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const cacheRef = useRef(new Map()); // Cache para evitar peticiones repetidas
  const lastFetchRef = useRef(0);

  useEffect(() => {
    if (!user) {
      console.error("User is undefined");
      return;
    }

    const streamLive = async () => {
      // Verificar caché
      const cacheKey = `user_${user}`;
      const now = Date.now();
      const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos
      
      if (cacheRef.current.has(cacheKey)) {
        const cached = cacheRef.current.get(cacheKey);
        if (now - cached.timestamp < CACHE_DURATION) {
          setStreamerLive(cached.data);
          setVideos(cached.videos || []);
          setLoading(false);
          return;
        }
      }

      // Debounce: evitar peticiones muy frecuentes
      if (now - lastFetchRef.current < 3000) { // 3 segundos mínimo
        return;
      }
      lastFetchRef.current = now;

      try {
        setLoading(true);
        
        const headers = {
          "Client-ID": CLIENT_ID,
          Authorization: `Bearer ${TOKEN_API}`,
        };

        if (!CLIENT_ID || !TOKEN_API) {
          console.error("CLIENT_ID o TOKEN_API no están configurados correctamente.");
          return;
        }

        // Hacer todas las peticiones en paralelo para reducir el tiempo total
        const [responseUser, liveStreamResponse] = await Promise.all([
          fetch(`https://api.twitch.tv/helix/users?login=${user}`, { headers }),
          fetch(`https://api.twitch.tv/helix/streams?user_login=${user}`, { headers })
        ]);

        if (!responseUser.ok) {
          throw new Error(`Error al obtener el usuario: ${responseUser.status}`);
        }

        const userData = await responseUser.json();
        const liveStreamData = await liveStreamResponse.json();
        const isLive = liveStreamData.data.length > 0;
        
        if (userData.data.length === 0) {
          console.error('Usuario no encontrado');
          setLoading(false);
          return;
        }

        const idUser = userData.data[0].id;

        // Solo hacer peticiones adicionales si es necesario
        const [dataUser, videosData] = await Promise.all([
          fetch(`https://api.twitch.tv/helix/channels?broadcaster_id=${idUser}`, { headers }),
          fetch(`https://api.twitch.tv/helix/videos?user_id=${idUser}&type=archive&first=6`, { headers }) // Limitar a 6 videos
        ]);

        let channelInfo = {};
        let videos = [];

        if (dataUser.ok) {
          const channelData = await dataUser.json();
          channelInfo = channelData.data[0] || {};
        }

        if (videosData.ok) {
          const videosResponse = await videosData.json();
          videos = videosResponse.data || [];
        }

        const fullData = {
          ...userData.data[0],
          ...channelInfo,
          isLive: isLive,
          liveViewers: isLive ? liveStreamData.data[0].viewer_count : 0
        };

        // Guardar en caché
        cacheRef.current.set(cacheKey, {
          data: fullData,
          videos: videos,
          timestamp: now
        });

        setStreamerLive(fullData);
        setVideos(videos);
        
      } catch (error) {
        console.error('Error fetching stream data:', error);
      } finally {
        setLoading(false);
      }
    };

    streamLive();
  }, [user]);
  return (
    <div className={`px-4 ml-20 flex flex-col h-full w-auto gap-y-4 ${isActive ? "ml-64" : "ml-20"}`}>
      {loading ? (
        <div className="flex justify-center items-center h-[500px]">
          <p className="text-xl">Cargando perfil de {user}...</p>
        </div>
      ) : streamLive ? (
        <>
          {/* Mostrar estado del stream */}
          <div className="mb-2">
            {streamLive.isLive ? (
              <span className="bg-red-600 text-white px-2 py-1 rounded text-sm">
                🔴 EN VIVO - {streamLive.liveViewers} espectadores
              </span>
            ) : (
              <span className="bg-gray-600 text-white px-2 py-1 rounded text-sm">
                ⚫ DESCONECTADO
              </span>
            )}
          </div>
          
          <iframe
            className="border-t-2 border-rose flex justify-center mx-auto h-[500px] w-full"
            src={`https://player.twitch.tv/?channel=${user}&parent=localhost&parent=suitch.netlify.app`}
            onLoad={() => console.log('Iframe cargado correctamente')}
            onError={(e) => console.error('Error al cargar iframe:', e)}
          ></iframe>

          <div className="flex flex-col gap-y-2 mx-2  ">
            <div className="flex items-center gap-x-2  border-[2px] border-black shadow-sm shadow-white/10  rounded-md p-2">
              <img
                src={`${streamLive.profile_image_url || user}`}
                alt="Avatar"
                className=" size-20 rounded-full"
              />
              <div className=" flex flex-col text-pretty">
                <h1 className="font-bold text-2xl">
                  {streamLive.display_name || user}
                </h1>
                <h2 className=" text-xs">
                  {streamLive.view_count}{" "}
                  <span className="font-thin">Espectadores</span>
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
                    className="p-1 bg-secundary  bg-zinc-600/10 flex flex-col w-auto h-auto border-2 border-[#232323]  rounded-md shadow-sm shadow-white/10 m-1 max-w-[550px] max-h-[400px] hover:translate-x-2 hover:-translate-y-2  hover:bg-rose hover:backdrop-blur-xl   transition-all duration-150 "
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
          <hr className=" mx-2 flex-1 border-t-1 border-zinc-800 " />
        </>
      ) : (
        <div className="flex justify-center items-center h-[500px]">
          <p className="text-xl">Usuario '{user}' no encontrado</p>
        </div>
      )}
    </div>
  );
}
