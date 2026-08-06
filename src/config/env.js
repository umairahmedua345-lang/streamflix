const TMDB_KEY =
  import.meta.env.VITE_TMDB_API_KEY;



if (!TMDB_KEY) {

  console.error(
    "TMDB API key is missing. Add VITE_TMDB_API_KEY in .env"
  );

}



export default {

  TMDB_KEY,

};