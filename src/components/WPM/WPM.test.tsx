import { render, screen } from "@testing-library/react";
import WPM from "./WPM";

describe("WPM", () => {
  test("renders the wpm value", () => {
    render(<WPM wpm={75} />);
    expect(screen.getByText("75")).toBeInTheDocument();
  });

  test("renders the WPM label", () => {
    render(<WPM wpm={0} />);
    expect(screen.getByText("WPM")).toBeInTheDocument();
  });

  test("renders 0 wpm value", () => {
    render(<WPM wpm={0} />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  test("updates displayed value when wpm prop changes", () => {
    const { rerender } = render(<WPM wpm={50} />);
    expect(screen.getByText("50")).toBeInTheDocument();

    rerender(<WPM wpm={120} />);
    expect(screen.getByText("120")).toBeInTheDocument();
    expect(screen.queryByText("50")).not.toBeInTheDocument();
  });
});
