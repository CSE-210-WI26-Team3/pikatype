import { render, screen, fireEvent } from "@testing-library/react";
import TimeUpModal from "./TimeUpModal";

describe("TimeUpModal", () => {
  describe("visibility", () => {
    test("does not render when isVisible is false", () => {
      render(<TimeUpModal isVisible={false} wpm={60} onPlayAgain={jest.fn()} />);
      expect(screen.queryByText("Time's Up!")).not.toBeInTheDocument();
    });

    test("renders when isVisible is true", () => {
      render(<TimeUpModal isVisible={true} wpm={60} onPlayAgain={jest.fn()} />);
      expect(screen.getByText("Time's Up!")).toBeInTheDocument();
    });
  });

  describe("wpm display", () => {
    test("displays the wpm value", () => {
      render(<TimeUpModal isVisible={true} wpm={75} onPlayAgain={jest.fn()} />);
      expect(screen.getByText("75")).toBeInTheDocument();
    });

    test("displays 0 wpm when no words were typed", () => {
      render(<TimeUpModal isVisible={true} wpm={0} onPlayAgain={jest.fn()} />);
      expect(screen.getByText("0")).toBeInTheDocument();
    });
  });

  describe("Play Again button", () => {
    test("renders the Play Again button", () => {
      render(<TimeUpModal isVisible={true} wpm={60} onPlayAgain={jest.fn()} />);
      expect(screen.getByRole("button", { name: "Play Again" })).toBeInTheDocument();
    });

    test("calls onPlayAgain when Play Again is clicked", () => {
      const onPlayAgain = jest.fn();
      render(<TimeUpModal isVisible={true} wpm={60} onPlayAgain={onPlayAgain} />);

      fireEvent.click(screen.getByRole("button", { name: "Play Again" }));

      expect(onPlayAgain).toHaveBeenCalledTimes(1);
    });

    test("does not call onPlayAgain when modal is not visible", () => {
      const onPlayAgain = jest.fn();
      render(<TimeUpModal isVisible={false} wpm={60} onPlayAgain={onPlayAgain} />);

      expect(screen.queryByRole("button", { name: "Play Again" })).not.toBeInTheDocument();
      expect(onPlayAgain).not.toHaveBeenCalled();
    });
  });
});
