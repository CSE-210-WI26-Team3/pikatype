import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import { useContext } from "react";
import { SingleWordGenerator } from "../../wordGeneration/index";
import TypingTrackerProvider, {
  TypingTrackerContext,
  TypingTrackerProgress,
} from "./TypingTrackerProvider";

// mock word generator to always return hello
beforeEach(() => {
  jest
    .spyOn(SingleWordGenerator.prototype, "getTypingPrompt")
    .mockImplementation(() => new Promise((resolve) => resolve("hello")));
});

afterEach(() => {
  jest.restoreAllMocks();
});

// Test UI that exposes the logic to the DOM
// We need this because these tests are only for the logic, not the UI
function TestConsumer() {
  const { content, cursor, state, completedWords, getNewContent } =
    useContext(TypingTrackerContext);
  return (
    <div>
      <span data-testid="content">{content}</span>
      <span data-testid="cursor">{cursor}</span>
      <span data-testid="state">{state}</span>
      <span data-testid="completedWords">{completedWords}</span>
      <button data-testid="new-content" onClick={getNewContent}>
        New Content
      </button>
    </div>
  );
}

function renderProvider() {
  return render(
    <TypingTrackerProvider promptGenerator={new SingleWordGenerator()}>
      <TestConsumer />
    </TypingTrackerProvider>,
  );
}

function pressKey(key: string) {
  act(() => {
    fireEvent.keyDown(window, { key });
  });
}

/**
 * Since our typing prompt generators are async, return Promises,
 * we must use waitFor() for tests to properly get the typing prompts from
 * resolved Promises
 */

describe("TypingTrackerProvider", () => {
  test("loads content and sets initial state on mount", async () => {
    renderProvider();

    await waitFor(() => {
      expect(screen.getByTestId("content")).toHaveTextContent("hello");
      expect(screen.getByTestId("cursor")).toHaveTextContent("0");
      expect(screen.getByTestId("state")).toHaveTextContent(
        TypingTrackerProgress.Valid,
      );
      expect(screen.getByTestId("completedWords")).toHaveTextContent("0");
    });
  });

  test("correct keypress advances cursor and stays Valid", async () => {
    renderProvider();

    await waitFor(() => {
      pressKey("h");

      expect(screen.getByTestId("cursor")).toHaveTextContent("1");
      expect(screen.getByTestId("state")).toHaveTextContent(
        TypingTrackerProgress.Valid,
      );
    });
  });

  test("wrong keypress sets state to Invalid", async () => {
    renderProvider();

    await waitFor(() => {
      pressKey("x");

      expect(screen.getByTestId("cursor")).toHaveTextContent("1");
      expect(screen.getByTestId("state")).toHaveTextContent(
        TypingTrackerProgress.Invalid,
      );
    });
  });

  test("backspace on Invalid decrements cursor and returns to Valid", async () => {
    renderProvider();

    await waitFor(() => {
      pressKey("x");
      expect(screen.getByTestId("cursor")).toHaveTextContent("1");
      expect(screen.getByTestId("state")).toHaveTextContent(
        TypingTrackerProgress.Invalid,
      );

      pressKey("Backspace");

      expect(screen.getByTestId("cursor")).toHaveTextContent("0");
      expect(screen.getByTestId("state")).toHaveTextContent(
        TypingTrackerProgress.Valid,
      );
    });
  });

  test("non-valid keys (Shift, Control, etc.) are ignored", async () => {
    renderProvider();

    await waitFor(() => {
      pressKey("Shift");
      pressKey("Control");
      pressKey("Alt");

      expect(screen.getByTestId("cursor")).toHaveTextContent("0");
      expect(screen.getByTestId("state")).toHaveTextContent(
        TypingTrackerProgress.Valid,
      );
    });
  });

  test("Backspace is ignored when state is Valid", async () => {
    renderProvider();

    await waitFor(() => {
      pressKey("h");

      expect(screen.getByTestId("cursor")).toHaveTextContent("1");
      expect(screen.getByTestId("state")).toHaveTextContent(
        TypingTrackerProgress.Valid,
      );

      pressKey("Backspace");

      expect(screen.getByTestId("cursor")).toHaveTextContent("1");
      expect(screen.getByTestId("state")).toHaveTextContent(
        TypingTrackerProgress.Valid,
      );
    });
  });

  test("typing the full word sets state to Complete and increments completedWords", async () => {
    renderProvider();

    await waitFor(() => {
      pressKey("h");
      pressKey("e");
      pressKey("l");
      pressKey("l");
      pressKey("o");

      expect(screen.getByTestId("state")).toHaveTextContent(
        TypingTrackerProgress.Complete,
      );
      expect(screen.getByTestId("completedWords")).toHaveTextContent("1");
    });
  });

  test("keypresses are ignored when state is Complete", async () => {
    renderProvider();

    await waitFor(() => {
      // Complete the word
      pressKey("h");
      pressKey("e");
      pressKey("l");
      pressKey("l");
      pressKey("o");

      expect(screen.getByTestId("state")).toHaveTextContent(
        TypingTrackerProgress.Complete,
      );

      // Further keypresses should be ignored
      pressKey("a");

      expect(screen.getByTestId("cursor")).toHaveTextContent("5");
      expect(screen.getByTestId("state")).toHaveTextContent(
        TypingTrackerProgress.Complete,
      );
    });
  });

  test("getNewContent resets cursor and state with new word", async () => {
    renderProvider();

    await waitFor(() => {
      // Type a couple characters
      pressKey("h");
      pressKey("e");

      // Click the new content button
      act(() => {
        fireEvent.click(screen.getByTestId("new-content"));
      });

      expect(screen.getByTestId("cursor")).toHaveTextContent("0");
      expect(screen.getByTestId("state")).toHaveTextContent(
        TypingTrackerProgress.Valid,
      );
      expect(screen.getByTestId("content")).toHaveTextContent("hello");
    });
  });

  test("only Backspace is handled when in Invalid state", async () => {
    renderProvider();

    await waitFor(() => {
      pressKey("x");

      expect(screen.getByTestId("state")).toHaveTextContent(
        TypingTrackerProgress.Invalid,
      );

      pressKey("a");

      expect(screen.getByTestId("cursor")).toHaveTextContent("1");
      expect(screen.getByTestId("state")).toHaveTextContent(
        TypingTrackerProgress.Invalid,
      );
    });
  });

  test("can recover from error and continue typing correctly", async () => {
    renderProvider();

    await waitFor(() => {
      pressKey("h"); // correct
      pressKey("x"); // wrong

      expect(screen.getByTestId("state")).toHaveTextContent(
        TypingTrackerProgress.Invalid,
      );

      pressKey("Backspace"); // recover

      expect(screen.getByTestId("cursor")).toHaveTextContent("1");
      expect(screen.getByTestId("state")).toHaveTextContent(
        TypingTrackerProgress.Valid,
      );

      // Continue typing correctly
      pressKey("e");

      expect(screen.getByTestId("cursor")).toHaveTextContent("2");
      expect(screen.getByTestId("state")).toHaveTextContent(
        TypingTrackerProgress.Valid,
      );
    });
  });
});
