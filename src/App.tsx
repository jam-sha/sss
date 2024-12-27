import "./App.css";
import { useState, useRef, useEffect } from "react";

function App() {
  const songs = [
    { path: "/pt.mp3", title: "Paris, Texas" },
    { path: "/cn.mp3", title: "Candy Necklace" },
  ];

  const audioRefs = useRef(new Map());
  const [playing, setPlaying] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState("");

  useEffect(() => {
    songs.forEach((song) => {
      const audio = new Audio(song.path);

      audio.addEventListener("ended", () => {
        setPlaying(false);
      });

      audioRefs.current.set(song.path, audio);
    });
  }, []);

  const changeSong = async (songPath: string) => {
    if (currentlyPlaying === songPath) {
      const currentAudio = audioRefs.current.get(songPath);
      if (!playing) {
        currentAudio.play();
        setPlaying(true);
      } else {
        currentAudio.pause();
        setPlaying(false);
      }
    } else {
      if (currentlyPlaying) {
        audioRefs.current.get(currentlyPlaying).pause();
        audioRefs.current.get(currentlyPlaying).currentTime = 0;
      }
      const newSong = audioRefs.current.get(songPath);
      setCurrentlyPlaying(songPath);
      newSong.play();
      setPlaying(true);
    }
  };

  return (
    <div>
      <div className="main">
        {songs.map((song) => (
          <button onClick={() => changeSong(song.path)}>
            {currentlyPlaying === song.path && playing
              ? `Pause ${song.title}`
              : `Play ${song.title}`}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
