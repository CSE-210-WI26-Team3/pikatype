import { render, screen, fireEvent } from "@testing-library/react";
import LevelFailedModal from "./LevelFailedModal";

describe("LevelFailedModal", () => {
  describe("wpm display", () => {
    test("displays the wpm value", () => {
      render(<LevelFailedModal wpm={75} onPlayAgain={jest.fn()} />);
      expect(screen.getByText("75")).toBeInTheDocument();
    });

    test("displays 0 wpm when no words were typed", () => {
      render(<LevelFailedModal wpm={0} onPlayAgain={jest.fn()} />);
      expect(screen.getByText("0")).toBeInTheDocument();
    });
  });

  describe("Play Again button", () => {
    test("renders the Play Again button", () => {
      render(<LevelFailedModal wpm={60} onPlayAgain={jest.fn()} />);
      expect(screen.getByRole("button", { name: "Play Again" })).toBeInTheDocument();
    });

    test("calls onPlayAgain when Play Again is clicked", () => {
      const onPlayAgain = jest.fn();
      render(<LevelFailedModal wpm={60} onPlayAgain={onPlayAgain} />);

      fireEvent.click(screen.getByRole("button", { name: "Play Again" }));

      expect(onPlayAgain).toHaveBeenCalledTimes(1);
    });
  });
});
