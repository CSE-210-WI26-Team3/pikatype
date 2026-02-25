import { render, fireEvent, act } from "@testing-library/react";
import TypingTrackerProvider from "./TypingTrackerProvider";
import TypingTrackerView from "./TypingTrackerView";

function renderTypingTracker() {
  return render(
    <TypingTrackerProvider>
      <TypingTrackerView />
    </TypingTrackerProvider>,
  );
}

function typeKey(key: string) {
  act(() => {
    fireEvent.keyDown(window, { key });
  });
}

function getSpans(container: HTMLElement) {
  return container.querySelectorAll("span");
}

function getWordText(container: HTMLElement) {
  return Array.from(getSpans(container))
    .map((s) => s.textContent)
    .join("");
}

/**
 * Tests for TypingTrackerViewBox color changes.
 *
 * Each character is rendered as a <span> with a CSS class that controls its color:
 *   - "pending" (gray) : not yet typed
 *   - "correct" (green) : typed correctly
 *   - "incorrect" (red)   : typed incorrectly
 *   - "complete" (blue)   : completed word
 *   - "cursor" (underline) : current typing position
 *
 * Math.random is mocked to control which word is selected:
 *   0 → "hello", 0.2 → "world", 0.4 → "typing"
 */
describe("TypingTracker", () => {
  beforeEach(() => {
    jest.spyOn(Math, "random").mockReturnValue(0);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  // Verifies initial render: all letters gray, cursor on the first letter
  test("renders all letters as pending with cursor on the first letter", () => {
    const { container } = renderTypingTracker();
    const spans = getSpans(container);

    expect(spans).toHaveLength(5);
    expect(getWordText(container)).toBe("hello");
    spans.forEach((span, i) => {
      expect(span).toHaveClass("pending");
      if (i === 0) {
        expect(span).toHaveClass("cursor");
      } else {
        expect(span).not.toHaveClass("cursor");
      }
    });
  });

  // Typing the correct key turns the letter green and advances the cursor
  test("marks a correctly typed letter as correct and moves cursor forward", () => {
    const { container } = renderTypingTracker();
    typeKey("h");

    const spans = getSpans(container);
    expect(spans[0]).toHaveClass("correct");
    expect(spans[0]).not.toHaveClass("cursor");
    expect(spans[1]).toHaveClass("pending");
    expect(spans[1]).toHaveClass("cursor");
  });

  // Typing the wrong key turns the letter red
  test("marks an incorrectly typed letter as incorrect", () => {
    const { container } = renderTypingTracker();
    typeKey("x");

    const spans = getSpans(container);
    expect(spans[0]).toHaveClass("incorrect");
  });

  // Completing the entire word turns all letters blue
  test("marks all letters as complete when the full word is typed correctly", () => {
    const { container } = renderTypingTracker();
    for (const char of "hello") {
      typeKey(char);
    }

    const spans = getSpans(container);
    spans.forEach((span) => {
      expect(span).toHaveClass("complete");
    });
  });

  // After completing a word, a new word appears after 600ms and resets to gray
  test("shows a new word after the completion timeout", () => {
    jest.useFakeTimers();
    const { container } = renderTypingTracker();

    for (const char of "hello") {
      typeKey(char);
    }

    (Math.random as jest.Mock).mockReturnValue(0.4);

    act(() => {
      jest.advanceTimersByTime(600);
    });

    expect(getWordText(container)).toBe("typing");

    const spans = getSpans(container);
    spans.forEach((span) => {
      expect(span).toHaveClass("pending");
    });
  });

  describe("word: 'world'", () => {
    beforeEach(() => {
      (Math.random as jest.Mock).mockReturnValue(0.2); // "world"
    });

    // Verifies a different word also starts with all letters gray
    test("renders 'world' with all letters pending", () => {
      const { container } = renderTypingTracker();
      expect(getWordText(container)).toBe("world");

      const spans = getSpans(container);
      spans.forEach((span) => {
        expect(span).toHaveClass("pending");
      });
    });

    // Typing w-o-r correctly turns the first 3 letters green, rest stay gray
    test("typing multiple correct letters marks them all as correct", () => {
      const { container } = renderTypingTracker();
      typeKey("w");
      typeKey("o");
      typeKey("r");

      const spans = getSpans(container);
      expect(spans[0]).toHaveClass("correct");
      expect(spans[1]).toHaveClass("correct");
      expect(spans[2]).toHaveClass("correct");
      expect(spans[3]).toHaveClass("pending");
      expect(spans[3]).toHaveClass("cursor");
      expect(spans[4]).toHaveClass("pending");
    });

    // A wrong key mid-word turns that letter red, but earlier correct letters stay green
    test("incorrect letter mid-word marks it as incorrect while previous stay correct", () => {
      const { container } = renderTypingTracker();
      typeKey("w");
      typeKey("o");
      typeKey("x"); // wrong: expected "r"

      const spans = getSpans(container);
      expect(spans[0]).toHaveClass("correct");
      expect(spans[1]).toHaveClass("correct");
      expect(spans[2]).toHaveClass("incorrect");
    });
  });

  describe("word: 'typing'", () => {
    beforeEach(() => {
      (Math.random as jest.Mock).mockReturnValue(0.4); // "typing"
    });

    // Completing all 6 letters turns the entire word blue
    test("completing 'typing' marks all letters as complete", () => {
      const { container } = renderTypingTracker();
      for (const char of "typing") {
        typeKey(char);
      }

      const spans = getSpans(container);
      expect(spans).toHaveLength(6);
      spans.forEach((span) => {
        expect(span).toHaveClass("complete");
      });
    });

    // Pressing Backspace after a wrong key resets that letter back to gray with cursor
    test("backspace after incorrect letter restores previous correct state", () => {
      const { container } = renderTypingTracker();
      typeKey("t");
      typeKey("x"); // wrong: expected "y"

      let spans = getSpans(container);
      expect(spans[1]).toHaveClass("incorrect");

      typeKey("Backspace");

      spans = getSpans(container);
      expect(spans[0]).toHaveClass("correct");
      expect(spans[1]).toHaveClass("pending");
      expect(spans[1]).toHaveClass("cursor");
    });
  });
});
