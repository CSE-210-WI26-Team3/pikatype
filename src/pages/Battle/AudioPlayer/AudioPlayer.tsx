import { useContext, useEffect, useMemo, useRef } from "react";
import { Save } from "../../../components/Storage/Save";
import { TimerContext, TimerStatus } from "../Timer/TimerProvider";

interface AudioPlayerProps {
  src: string;
}

function AudioPlayer({ src }: AudioPlayerProps) {
  const { timerState } = useContext(TimerContext);
  const audioRef = useRef<HTMLAudioElement>(null);
  const save = useMemo(() => new Save(10), []);

  useEffect(() => {
    if (!audioRef.current) return;

    if (!save.getAudioMuted()) {
      audioRef.current.volume = save.getVolume();
    }

    if (timerState.status === TimerStatus.Ongoing && !save.getAudioMuted()) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [timerState.status, save]);

  return <audio src={src} ref={audioRef} />;
}

export default AudioPlayer;
