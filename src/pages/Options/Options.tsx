import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import Button from "../../components/Button/Button";
import { Save } from "../../components/Storage/Save";
import styles from "./Options.module.css";

function Options() {
  const save = useMemo(() => new Save(3), []);
  const [volume, setVolume] = useState<number>(save.getVolume());
  const [audioMuted, setAudioMuted] = useState<boolean>(save.getAudioMuted());
  const navigate = useNavigate();

  function saveSettings() {
    save.setAudioMuted(audioMuted);
    save.setVolume(volume);
  }

  return (
    <div className={styles.optionsScreen}>
      <div className={styles.optionsContainer}>
        <h1 className={styles.optionsHeading}>Options</h1>

        <div className={styles.settingContainer}>
          <label className={styles.volumeLabel} htmlFor="volume">
            Volume
          </label>
          <input
            id="volume"
            type="range"
            min="0"
            max="1"
            step="0.01"
            defaultValue={volume}
            onChange={(e) => {
              console.log(e.target.value);
              setVolume(parseFloat(e.target.value));
            }}
          />
        </div>

        <div className={styles.settingContainer}>
          <label className={styles.muteLabel} htmlFor="muteVolume">
            Mute
          </label>
          <div className={styles.checkboxContainer}>
            <input
              className={styles.checkbox}
              defaultChecked={audioMuted}
              id="muteVolume"
              type="checkbox"
              onChange={(e) => setAudioMuted(e.target.checked)}
            />
          </div>
        </div>

        <Button
          className={styles.button}
          label="Save"
          onClick={() => saveSettings()}
        />

        <Button
          className={styles.button}
          label="Back to Menu"
          onClick={() => navigate("/")}
        />
      </div>
    </div>
  );
}

export default Options;
