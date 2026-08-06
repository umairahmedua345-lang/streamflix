const PLAYER_URL = "https://peachify.pro";

export function movieUrl(id, options = {}) {
  const url = new URL(`${PLAYER_URL}/embed/movie/${id}`);

  Object.entries(options).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  return url.toString();
}

export function tvUrl(id, season, episode, options = {}) {
  const url = new URL(
    `${PLAYER_URL}/embed/tv/${id}/${season}/${episode}`
  );

  Object.entries(options).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  return url.toString();
}