import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";


const ThemeContext =
  createContext();



export function ThemeProvider({
  children,
}) {


  const [dark, setDark] =
    useState(() => {


      return (
        localStorage.getItem("theme")
        !== "light"
      );


    });




  useEffect(() => {


    if(dark) {

      document.documentElement.classList.add(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "dark"
      );


    } else {


      document.documentElement.classList.remove(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "light"
      );


    }


  },[dark]);





  const toggleTheme = () =>
    setDark(!dark);




  return (

    <ThemeContext.Provider

      value={{
        dark,
        toggleTheme,
      }}

    >

      {children}

    </ThemeContext.Provider>

  );

}





export function useTheme() {

  return useContext(
    ThemeContext
  );

}