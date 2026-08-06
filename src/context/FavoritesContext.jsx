import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";


const FavoritesContext = createContext();


const STORAGE_KEY = "streamflixFavorites";



export function FavoritesProvider({
  children,
}) {

  const [favorites, setFavorites] =
    useState([]);



  useEffect(() => {

    const saved =
      localStorage.getItem(
        STORAGE_KEY
      );


    if (saved) {

      setFavorites(
        JSON.parse(saved)
      );

    }

  }, []);



  function saveFavorites(items) {

    setFavorites(items);


    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(items)
    );

  }



  function toggleFavorite(item) {


    const exists =
      favorites.some(
        (fav) =>
          fav.id === item.id
      );



    if (exists) {


      const updated =
        favorites.filter(
          (fav) =>
            fav.id !== item.id
        );


      saveFavorites(updated);


    } else {


      saveFavorites([
        ...favorites,
        item,
      ]);


    }


  }




  function isFavorite(id) {

    return favorites.some(
      (item) =>
        item.id === id
    );

  }



  return (

    <FavoritesContext.Provider

      value={{
        favorites,
        toggleFavorite,
        isFavorite,
      }}

    >

      {children}

    </FavoritesContext.Provider>

  );

}




export function useFavorites() {

  return useContext(
    FavoritesContext
  );

}