
export async function onRequestGet({ env }) {
  const {
    SPOTIFY_CLIENT_ID,
    SPOTIFY_REFRESH_TOKEN
  } = env;

  const json = (data, status = 200) =>
    Response.json(data, {
      status,
      headers: {
        "Cache-Control": "no-store"
      }
    });

  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_REFRESH_TOKEN) {
    return json({ error: "Spotify not configured" }, 503);
  }

  try {
    // Refresh access token using PKCE.
    const tokenResponse = await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: SPOTIFY_REFRESH_TOKEN,
          client_id: SPOTIFY_CLIENT_ID
        })
      }
    );

    if (!tokenResponse.ok) {
      throw new Error(`Token error: ${tokenResponse.status}`);
    }

    const { access_token } = await tokenResponse.json();

    // Get currently playing track.
    const response = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }
    );

    if (response.status === 204) {
      return json({ isPlaying: false });
    }

    if (!response.ok) {
      throw new Error(`Playback error: ${response.status}`);
    }

    const data = await response.json();

    if (!data?.is_playing || data.item?.type !== "track") {
      return json({ isPlaying: false });
    }

    return json({
      isPlaying: true,
      track: {
        title: data.item.name,
        artist: data.item.artists
          .map(artist => artist.name)
          .join(", "),
        cover: data.item.album.images[0]?.url || "",
        url: data.item.external_urls.spotify
      }
    });

  } catch (error) {
    console.error("Spotify API:", error);
    return json({ error: "Spotify request failed" }, 502);
  }
}
