import { url, CLIENT_ID, TOKEN_API, urlStreamer } from "../services/apiTwitch";

export async function awaitStream() {
  const headers = {
    "Client-ID": CLIENT_ID,
    Authorization: `Bearer ${TOKEN_API}`,
  };
  try {
    const respuesta = await fetch(url, {
      headers,
    });
    const info = await respuesta.json();
    // cambie la forma de tener un ide en aleatorio
    let idUser = info.data[Math.floor(Math.random() * info.data.length)].user_id;

    console.log("idUser", idUser);

    const infoStream = info.data

    console.log(infoStream);
    return infoStream || [];

    
  } catch (error) {
    console.log("error");

    return [];
  }
}



export async function awaitYourFollows() {
  const headers = {
    "Client-ID": CLIENT_ID,
    Authorization: `Bearer ${TOKEN_API}`,
  };

  const favoriteStreams = ['midudev', 'illojuan', 'ManzDev', 'alanpr0o', 'elxokas', 'ibai', 'Theo', 'TheGrefg'];

  // Crear el query string para los nombres de los usuarios
  const loginQuery = favoriteStreams.map(user => `login=${user}`).join('&');
  const urlFavorites = `https://api.twitch.tv/helix/users?${loginQuery}`;

  try {
    const respuesta = await fetch(urlFavorites, { headers });

    if (!respuesta.ok) {
      console.log(`Error: ${respuesta.status} - ${respuesta.statusText}`);
      const errorDetails = await respuesta.json();
      console.log(errorDetails);
      return [];
    }

    // Obtener los datos de los streamers
    const info = await respuesta.json();
    const userIds = info.data.map(user => user.id);

    // Hacer fetch para todos los streamers en paralelo
    const respuestasCompletas = await Promise.all(
      userIds.map(id => fetch(`https://api.twitch.tv/helix/channels?broadcaster_id=${id}`, { headers }))
    );

    // Convertir todas las respuestas a JSON
    const jsonRespuestas = await Promise.all(respuestasCompletas.map(res => res.json()));

    // Combinar la información de usuario con la de canales
    const fullData = info.data.map((user, index) => {
      const channelData = jsonRespuestas[index]?.data?.[0] || {}; // Evitar errores si la respuesta está vacía
      return {
        ...user,
        ...channelData
      };
    });

    console.log(fullData);

    return fullData;
  } catch (error) {
    console.log("Error en la solicitud:", error);
    return [];
  }
}



// perfiles
