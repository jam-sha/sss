import "./App.css";
import { useState, useRef, useEffect } from "react";

interface SymbolProps {
  playing: string;
  songpath: string;
  isplaying: boolean;
}

function App() {
  const songs = [
    { path: "/pt.mp3", title: "Paris, Texas" },
    { path: "/cn.mp3", title: "Candy Necklace" },
  ];
  const audioRefs = useRef<Map<string, HTMLAudioElement>>(new Map());
  const [playing, setPlaying] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState("");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    songs.forEach((song) => {
      const audio = new Audio(song.path);

      audio.addEventListener("ended", () => {
        const currindex = songs.findIndex((x) => x.path == song.path);
        const nextsongindex = (currindex + 1) % songs.length;
        changeSong(songs[nextsongindex].path);
      });

      audio.addEventListener("timeupdate", () => {
        setCurrentTime(audio.currentTime);
      });

      audio.addEventListener("loadedmetadata", () => {
        if (song.path === currentlyPlaying) {
          setDuration(audio.duration);
        }
      });

      audioRefs.current.set(song.path, audio);
    });
  }, []);

  const changeSong = (songPath: string) => {
    if (currentlyPlaying === songPath) {
      const currentAudio = audioRefs.current.get(songPath);
      if (currentAudio) {
        if (!playing) {
          currentAudio.play();
          setPlaying(true);
        } else {
          currentAudio.pause();
          setPlaying(false);
        }
      }
    } else {
      if (currentlyPlaying) {
        const currentAudio = audioRefs.current.get(currentlyPlaying);
        if (currentAudio) {
          currentAudio.pause();
          currentAudio.currentTime = 0;
        }
      }
      const newSong = audioRefs.current.get(songPath);
      if (newSong) {
        setCurrentlyPlaying(songPath);
        setCurrentTime(0);
        setDuration(newSong.duration);
        newSong.play();
        setPlaying(true);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (currentlyPlaying) {
      const audio = audioRefs.current.get(currentlyPlaying);
      if (audio) {
        const time = (Number(e.target.value) / 100) * duration;
        audio.currentTime = time;
        setCurrentTime(time);
      }
    }
  };

  const whatsymbol = ({ playing, songpath, isplaying }: SymbolProps) => {
    if (playing === songpath && isplaying) {
      return (
        // pause
        <svg
          viewBox="0 0 16 16"
          fill="black"
          style={{ minWidth: "24px", minHeight: "24px" }}
        >
          <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z" />
        </svg>
      );
    } else {
      // play
      return (
        <svg
          viewBox="0 0 16 16"
          fill="black"
          style={{ minWidth: "24px", minHeight: "24px" }}
        >
          <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894a.7.7 0 0 1-1.05-.607V1.713z" />
        </svg>
      );
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <div className="main">
        {songs.map((song) => (
          <div key={song.path} className="innerelements">
            <button onClick={() => changeSong(song.path)}>
              {whatsymbol({
                playing: currentlyPlaying,
                songpath: song.path,
                isplaying: playing,
              })}
            </button>
            <div className="title">
              <p>{song.title}</p>
            </div>
          </div>
        ))}
      </div>
      <div>
        <span>{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max="100"
          value={(currentTime / duration) * 100 || 0}
          onChange={handleSeek}
        />
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}

export default App;
