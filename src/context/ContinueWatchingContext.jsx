import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ContinueWatchingContext = createContext();

const STORAGE_KEY = "peachifyProgress";


export function ContinueWatchingProvider({
  children,
}) {

  const [continueWatching, setContinueWatching] =
    useState({});


  function loadProgress() {

    try {

      const saved =
        localStorage.getItem(
          STORAGE_KEY
        );


      if (!saved) {
        setContinueWatching({});
        return;
      }


      setContinueWatching(
        JSON.parse(saved)
      );


    } catch (error) {

      console.error(
        "Progress loading error:",
        error
      );

      setContinueWatching({});

    }

  }



  useEffect(() => {

    loadProgress();


    function handleStorage(event) {

      if (
        event.key === STORAGE_KEY
      ) {
        loadProgress();
      }

    }


    function handleCustomUpdate() {
      loadProgress();
    }


    window.addEventListener(
      "storage",
      handleStorage
    );


    window.addEventListener(
      "peachify-update",
      handleCustomUpdate
    );


    return () => {

      window.removeEventListener(
        "storage",
        handleStorage
      );


      window.removeEventListener(
        "peachify-update",
        handleCustomUpdate
      );

    };


  }, []);



  function refreshContinueWatching() {

    loadProgress();

    window.dispatchEvent(
      new Event(
        "peachify-update"
      )
    );

  }



  return (
    <ContinueWatchingContext.Provider
      value={{
        continueWatching,
        refreshContinueWatching,
      }}
    >
      {children}
    </ContinueWatchingContext.Provider>
  );

}



export function useContinueWatching() {

  return useContext(
    ContinueWatchingContext
  );

}