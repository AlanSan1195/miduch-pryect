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
    console.log("tu info:", info);
    return info.data || [];
  } catch (error) {
    console.log("error");
    return [];
  }
}

// este respuesta solo obtiene la respuesta de info incompleta haz un return de la fullData
