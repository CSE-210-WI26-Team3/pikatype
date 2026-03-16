import { render, screen, fireEvent } from "@testing-library/react";
import LevelCompleteModal from "./LevelCompleteModal";

describe("LevelCompleteModal", () => {
  describe("wpm display", () => {
    test("displays the wpm value", () => {
      render(<LevelCompleteModal wpm={90} onNextLevel={jest.fn()} />);
      expect(screen.getByText("90")).toBeInTheDocument();
    });

    test("displays 0 wpm when no words were typed", () => {
      render(<LevelCompleteModal wpm={0} onNextLevel={jest.fn()} />);
      expect(screen.getByText("0")).toBeInTheDocument();
    });
  });

  describe("Next Level button", () => {
    test("renders the Next Level button", () => {
      render(<LevelCompleteModal wpm={90} onNextLevel={jest.fn()} />);
      expect(screen.getByRole("button", { name: "Next Level" })).toBeInTheDocument();
    });

    test("calls onNextLevel when Next Level is clicked", () => {
      const onNextLevel = jest.fn();
      render(<LevelCompleteModal wpm={90} onNextLevel={onNextLevel} />);

      fireEvent.click(screen.getByRole("button", { name: "Next Level" }));

      expect(onNextLevel).toHaveBeenCalledTimes(1);
    });

    test("button is disabled when onNextLevel is not provided", () => {
      render(<LevelCompleteModal wpm={90} />);
      expect(screen.getByRole("button", { name: "Next Level" })).toBeDisabled();
    });
  });
});
