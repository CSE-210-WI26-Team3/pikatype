import { createContext, ReactNode, useCallback, useEffect, useState } from "react";

export enum TypingTrackerProgress {
  Valid = "Valid",
  Invalid = "Invalid",
  Complete = "Complete",
};

type TypingTrackerState = {
  content: string;
  cursor: number;
  state: TypingTrackerProgress;
  completedWords: number;
};

type TypingTrackerContextType = TypingTrackerState & {
  getNewContent: () => void;
};

const DEFAULT_TYPING_TRACKER_STATE = {
  content: "",
  cursor: 0,
  state: TypingTrackerProgress.Valid,
  completedWords: 0,
};

const TypingTrackerContext = createContext<TypingTrackerContextType>({
  ...DEFAULT_TYPING_TRACKER_STATE,
  getNewContent: () => { },
});

// Mock function
function getNextWord() {
  const words = ["hello", "world", "typing", "practice", "random"];
  return words[Math.floor(Math.random() * words.length)];
}

function TypingTrackerProvider({ children }: { children: ReactNode }) {
  const [typingTrackerState, setTypingTrackerState] = useState<TypingTrackerState>(DEFAULT_TYPING_TRACKER_STATE);

  const updateContent = useCallback((content: string) => {
    setTypingTrackerState(prev => ({
      ...prev,
      content,
    }));
  }, []);

  const updateState = useCallback((state: TypingTrackerProgress) => {
    setTypingTrackerState(prev => ({
      ...prev,
      state,
    }));
  }, []);

  const incrementCursor = useCallback(() => {
    setTypingTrackerState(prev => ({
      ...prev,
      cursor: prev.cursor + 1,
    }));
  }, []);

  const decrementCursor = useCallback(() => {
    setTypingTrackerState(prev => ({
      ...prev,
      cursor: prev.cursor - 1,
    }));
  }, []);

  const incrementCompletedWords = useCallback(() => {
    setTypingTrackerState(prev => ({
      ...prev,
      completedWords: prev.completedWords + 1,
    }));
  }, []);

  const getNewContent = useCallback(() => {
    updateContent(getNextWord());
    setTypingTrackerState(prev => ({
      ...prev,
      cursor: 0,
      state: TypingTrackerProgress.Valid,
    }))
  }, []);

  // Set word on load
  useEffect(() => {
    getNewContent();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (typingTrackerState.state === TypingTrackerProgress.Complete) return;

      console.log(event.key);
      if (typingTrackerState.state === TypingTrackerProgress.Invalid) {
        if (event.key === "Backspace") {
          decrementCursor();
          updateState(TypingTrackerProgress.Valid);
        }
      } else if (event.key === typingTrackerState.content[typingTrackerState.cursor]) {
        incrementCursor();
        if (typingTrackerState.cursor === typingTrackerState.content.length - 1) {
          incrementCompletedWords();
          updateState(TypingTrackerProgress.Complete);
        }
      } else {
        incrementCursor();
        updateState(TypingTrackerProgress.Invalid);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [typingTrackerState]);

  return (
    <TypingTrackerContext.Provider value={{ ...typingTrackerState, getNewContent }}>
      {children}
    </TypingTrackerContext.Provider>
  );
}

export { TypingTrackerContext };
export default TypingTrackerProvider;