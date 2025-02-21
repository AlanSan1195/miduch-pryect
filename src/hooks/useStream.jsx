import { useEffect, useState } from "react";
import { CLIENT_ID, TOKEN_API, urlStreamer } from "../services/apiTwitch";

export function useStream(search) {
  const [streams, setStreams] = useState([]);

  useEffect(() => {
    if (!search || search.length < 3) return; // No buscar si el término es vacío o muy corto

    if (search) {
      fetch(`${urlStreamer}?login=${search}`, {
        headers: {
          "Client-ID": CLIENT_ID,
          Authorization: `Bearer ${TOKEN_API}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setStreams(data.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [search]);

  return { streams };
}
