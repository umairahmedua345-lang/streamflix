import { useParams } from "react-router-dom";

import Layout from "../components/layout/Layout";
import PeachifyPlayer from "../components/player/PeachifyPlayer";

import { movieUrl } from "../services/peachify";

export default function WatchMovie() {
  const { id } = useParams();

  const src = movieUrl(id, {
    quality: 1080,
    subtitle: "English",
    audio: "English",
    autoPlay: true,
  });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-8">

        <PeachifyPlayer src={src} />

      </div>
    </Layout>
  );
}