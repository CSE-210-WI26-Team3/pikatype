import { useEffect, useMemo, useRef } from "react";
import { Save } from "../../../components/Storage/Save";

interface AudioPlayerProps {
  playing: boolean;
  src: string;
}

function AudioPlayer({ playing, src }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const save = useMemo(() => new Save(10), []);

  useEffect(() => {
    if (!audioRef.current) return;

    if (!save.getAudioMuted()) {
      audioRef.current.volume = save.getVolume();
    }

    if (playing && !save.getAudioMuted()) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [playing, save]);

  return <audio src={src} ref={audioRef} />;
}

export default AudioPlayer;
