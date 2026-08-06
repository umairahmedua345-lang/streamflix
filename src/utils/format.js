export function rating(value) {
  return value ? value.toFixed(1) : "N/A";
}

export function title(item) {
  return item.title || item.name || "Unknown";
}

export function media(item) {
  return item.media_type ||
    (item.first_air_date ? "tv" : "movie");
}