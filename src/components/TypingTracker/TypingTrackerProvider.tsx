import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { TypingPromptGenerator } from "../../wordGeneration";

const VALID_KEYS_PATTERN = /^[a-zA-Z ]$/;

export enum TypingTrackerProgress {
  Valid = "Valid",
  Invalid = "Invalid",
  Complete = "Complete",
}

type TypingTrackerState = {
  content: string;
  cursor: number;
  state: TypingTrackerProgress;
  completedWords: number;
  totalCharsTyped: number;
};

type TypingTrackerContextType = TypingTrackerState & {
  getNewContent: () => void;
};

const DEFAULT_TYPING_TRACKER_STATE = {
  content: "",
  cursor: 0,
  state: TypingTrackerProgress.Valid,
  completedWords: 0,
  totalCharsTyped: 0,
};

const TypingTrackerContext = createContext<TypingTrackerContextType>({
  ...DEFAULT_TYPING_TRACKER_STATE,
  getNewContent: () => {},
});

interface TypingTrackerProviderProps {
  promptGenerator: TypingPromptGenerator;
  children: ReactNode;
  isActive?: boolean;
  onWordComplete?: (totalCharsTyped: number) => void;
}

function TypingTrackerProvider({
  promptGenerator,
  children,
  isActive = false,
  onWordComplete,
}: TypingTrackerProviderProps) {
  const [typingTrackerState, setTypingTrackerState] =
    useState<TypingTrackerState>(DEFAULT_TYPING_TRACKER_STATE);

  const updateContent = useCallback((content: string) => {
    setTypingTrackerState((prev) => ({
      ...prev,
      content,
    }));
  }, []);

  const updateState = useCallback((state: TypingTrackerProgress) => {
    setTypingTrackerState((prev) => ({
      ...prev,
      state,
    }));
  }, []);

  const incrementCursor = useCallback(() => {
    setTypingTrackerState((prev) => ({
      ...prev,
      cursor: prev.cursor + 1,
    }));
  }, []);

  const decrementCursor = useCallback(() => {
    setTypingTrackerState((prev) => ({
      ...prev,
      cursor: prev.cursor - 1,
    }));
  }, []);

  const incrementCompletedWords = useCallback((wordLength: number) => {
    setTypingTrackerState((prev) => ({
      ...prev,
      completedWords: prev.completedWords + 1,
      totalCharsTyped: prev.totalCharsTyped + wordLength,
    }));
  }, []);

  const getNewContent = useCallback(() => {
    promptGenerator.getTypingPrompt().then((prompt) => {
      updateContent(prompt);
      setTypingTrackerState((prev) => ({
        ...prev,
        cursor: 0,
        state: TypingTrackerProgress.Valid,
      }));
    });
  }, [updateContent, promptGenerator]);

  // Set word on load
  useEffect(() => {
    getNewContent();
  }, [getNewContent]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isActive) return;
      if (typingTrackerState.state === TypingTrackerProgress.Complete) return;

      if (typingTrackerState.state === TypingTrackerProgress.Invalid) {
        if (event.key === "Backspace") {
          decrementCursor();
          updateState(TypingTrackerProgress.Valid);
        }
      } else if (
        event.key === typingTrackerState.content[typingTrackerState.cursor]
      ) {
        incrementCursor();
        if (
          typingTrackerState.cursor ===
          typingTrackerState.content.length - 1
        ) {
          const wordLength = typingTrackerState.content.length;
          const newTotalChars = typingTrackerState.totalCharsTyped + wordLength;
          incrementCompletedWords(wordLength);
          updateState(TypingTrackerProgress.Complete);
          onWordComplete?.(newTotalChars);
        }
      } else {
        if (!VALID_KEYS_PATTERN.test(event.key)) return; // if key is invalid, don't do anything

        incrementCursor();
        updateState(TypingTrackerProgress.Invalid);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    typingTrackerState,
    isActive,
    decrementCursor,
    incrementCompletedWords,
    incrementCursor,
    updateState,
    onWordComplete,
  ]);

  return (
    <TypingTrackerContext.Provider
      value={{ ...typingTrackerState, getNewContent }}
    >
      {children}
    </TypingTrackerContext.Provider>
  );
}

export { TypingTrackerContext };
export default TypingTrackerProvider;
