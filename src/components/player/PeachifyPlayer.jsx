import { useEffect } from "react";

const ORIGIN = "https://peachify.pro";

export default function PeachifyPlayer({ src }) {
  useEffect(() => {
    function listener(event) {
      if (event.origin !== ORIGIN) return;

      if (event.data?.type === "MEDIA_DATA") {
        localStorage.setItem(
          "peachifyProgress",
          JSON.stringify(event.data.data)
        );
      }

      if (event.data?.type === "PLAYER_EVENT") {
        console.log(event.data.data);
      }
    }

    window.addEventListener("message", listener);

    return () =>
      window.removeEventListener("message", listener);
  }, []);

  return (
    <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
      <iframe
        src={src}
        title="Peachify Player"
        className="h-full w-full"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}