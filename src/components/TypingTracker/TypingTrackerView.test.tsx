import {
  render,
  fireEvent,
  act,
  waitFor,
  screen,
} from "@testing-library/react";
import { SingleWordGenerator } from "../../wordGeneration/index";
import TypingTrackerProvider from "./TypingTrackerProvider";
import TypingTrackerView from "./TypingTrackerView";

function renderTypingTracker() {
  return render(
    <TypingTrackerProvider promptGenerator={new SingleWordGenerator()}>
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
 *  We mock a SingleWordGenerator for this test to return words "hello",
 *  "world", and "typing"
 *
 *  Since our typing prompt generators are async, return Promises,
 *  we must use waitFor() for tests to properly get the typing prompts from
 *  resolved Promises
 */
describe("TypingTracker", () => {
  beforeEach(() => {
    jest
      .spyOn(SingleWordGenerator.prototype, "getTypingPrompt")
      .mockImplementation(() => new Promise((resolve) => resolve("hello")));
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  // Verifies initial render: all letters gray, cursor on the first letter
  test("renders all letters as pending with cursor on the first letter", async () => {
    const { container } = renderTypingTracker();

    await waitFor(() => {
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
  });

  // Typing the correct key turns the letter green and advances the cursor
  test("marks a correctly typed letter as correct and moves cursor forward", async () => {
    const { container } = renderTypingTracker();

    await waitFor(() => {
      typeKey("h");

      const spans = getSpans(container);
      expect(spans[0]).toHaveClass("correct");
      expect(spans[0]).not.toHaveClass("cursor");
      expect(spans[1]).toHaveClass("pending");
      expect(spans[1]).toHaveClass("cursor");
    });
  });

  // Typing the wrong key turns the letter red
  test("marks an incorrectly typed letter as incorrect", async () => {
    const { container } = renderTypingTracker();

    await waitFor(() => {
      typeKey("x");

      const spans = getSpans(container);
      expect(spans[0]).toHaveClass("incorrect");
    });
  });

  // Completing the entire word turns all letters blue
  test("marks all letters as complete when the full word is typed correctly", async () => {
    const { container } = renderTypingTracker();

    await waitFor(() => {
      for (const char of "hello") {
        typeKey(char);
      }

      const spans = getSpans(container);
      spans.forEach((span) => {
        expect(span).toHaveClass("complete");
      });
    });
  });

  // After completing a word, a new word appears after 600ms and resets to gray
  test("shows a new word after the completion timeout", async () => {
    jest.useFakeTimers("modern");

    jest
      .spyOn(SingleWordGenerator.prototype, "getTypingPrompt")
      .mockReset() // reset the beforeEach() mockImplementation since this is a special case where we want two different words for each mock call
      .mockImplementationOnce(() => new Promise((resolve) => resolve("hello")))
      .mockImplementationOnce(
        () => new Promise((resolve) => resolve("typing")),
      );

    const { container } = renderTypingTracker();

    // Type the first word "hello"
    await waitFor(() => {
      expect(getWordText(container)).toBe("hello");
    });

    for (const char of "hello") {
      typeKey(char);
    }

    await waitFor(() => {
      expect(getWordText(container)).toBe("hello");
    });

    // new word "typing" appears after timeout
    await act(async () => {
      jest.advanceTimersByTime(600);
    });

    await waitFor(() => {
      expect(getWordText(container)).toBe("typing");

      const spans = getSpans(container);
      spans.forEach((span) => {
        expect(span).toHaveClass("pending");
      });
    });
  });

  describe("word: 'world'", () => {
    beforeEach(() => {
      jest
        .spyOn(SingleWordGenerator.prototype, "getTypingPrompt")
        .mockImplementation(() => new Promise((resolve) => resolve("world")));
    });

    // Verifies a different word also starts with all letters gray
    test("renders 'world' with all letters pending", async () => {
      const { container } = renderTypingTracker();

      await waitFor(() => {
        expect(getWordText(container)).toBe("world");

        const spans = getSpans(container);
        spans.forEach((span) => {
          expect(span).toHaveClass("pending");
        });
      });
    });

    // Typing w-o-r correctly turns the first 3 letters green, rest stay gray
    test("typing multiple correct letters marks them all as correct", async () => {
      const { container } = renderTypingTracker();

      await waitFor(() => {
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
    });

    // A wrong key mid-word turns that letter red, but earlier correct letters stay green
    test("incorrect letter mid-word marks it as incorrect while previous stay correct", async () => {
      const { container } = renderTypingTracker();

      await waitFor(() => {
        typeKey("w");
        typeKey("o");
        typeKey("x"); // wrong: expected "r"

        const spans = getSpans(container);
        expect(spans[0]).toHaveClass("correct");
        expect(spans[1]).toHaveClass("correct");
        expect(spans[2]).toHaveClass("incorrect");
      });
    });
  });

  describe("word: 'typing'", () => {
    beforeEach(() => {
      jest
        .spyOn(SingleWordGenerator.prototype, "getTypingPrompt")
        .mockImplementation(() => new Promise((resolve) => resolve("typing")));
    });

    // Completing all 6 letters turns the entire word blue
    test("completing 'typing' marks all letters as complete", async () => {
      const { container } = renderTypingTracker();

      await waitFor(() => {
        for (const char of "typing") {
          typeKey(char);
        }

        const spans = getSpans(container);
        expect(spans).toHaveLength(6);
        spans.forEach((span) => {
          expect(span).toHaveClass("complete");
        });
      });
    });

    // Pressing Backspace after a wrong key resets that letter back to gray with cursor
    test("backspace after incorrect letter restores previous correct state", async () => {
      const { container } = renderTypingTracker();

      await waitFor(() => {
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
});
