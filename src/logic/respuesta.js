import {url, CLIENT_ID, TOKEN_API, urlStreamer} from "../services/apiTwitch";

export async function awaitStream() {
  try {
    const respuesta = await fetch(url, {
      headers: {
        "Client-ID": CLIENT_ID,
        Authorization: `Bearer ${TOKEN_API}`,
      },
    });
    const info = await respuesta.json();
    console.log("tu info:", info);
    return info.data || [];
  } catch (error) {
    console.log("error");
    return []
  }
}




