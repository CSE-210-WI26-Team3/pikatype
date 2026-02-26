import { render, screen } from "@testing-library/react";
import Levels from "./Levels";
import { NUM_LEVELS } from "./LevelConfigs";
import { Save } from "../../components/Storage/Save";

const mockNavigate = jest.fn();

jest.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

describe("levels choice screen tests", () => {
  it("renders all levels correctly", () => {
    const { container } = render(<Levels />);

    expect(
      container.querySelectorAll(".levelButton, .disabledLevelButton").length,
    ).toEqual(NUM_LEVELS);
  });

  it("first level is never disabled so player can start the game", () => {
    render(<Levels />);

    const firstLevelButton = screen.getByTestId("level-button-1");
    expect(firstLevelButton).toBeInTheDocument();
    firstLevelButton.click();
    expect(mockNavigate).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/battle/1");
  });

  it("clicking on a level button player has already completed still navigates them to the level", () => {
    // simulate save state of player completed 5 levels
    jest.spyOn(Save.prototype, "isCompleted").mockImplementation((i) => i <= 5);

    render(<Levels />);

    const thirdLevelButton = screen.getByTestId("level-button-3");
    expect(thirdLevelButton).toBeInTheDocument();
    thirdLevelButton.click();
    expect(mockNavigate).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/battle/3");
  });

  it("clicking on a disabled level button does nothing", () => {
    render(<Levels />);

    const thirdLevelButton = screen.getByTestId("level-button-3");
    thirdLevelButton.click();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("only the next level to complete is enabled, all succeeding levels are disabled", () => {
    // simulate save state of player completed 5 levels
    const completedLevels = 5;
    jest
      .spyOn(Save.prototype, "isCompleted")
      .mockImplementation((i) => i <= completedLevels);

    render(<Levels />);

    let timesNavigateCalled = 0;

    // levels 1-6 should be navigable, 7 through 9 should be disabled
    for (let i = 1; i <= NUM_LEVELS; i++) {
      const levelButton = screen.getByTestId(`level-button-${i}`);
      expect(levelButton).toBeInTheDocument();
      levelButton.click();

      if (i <= completedLevels + 1) {
        timesNavigateCalled++;
        expect(mockNavigate).toHaveBeenCalledTimes(timesNavigateCalled);
        expect(mockNavigate).toHaveBeenNthCalledWith(
          timesNavigateCalled,
          `/battle/${timesNavigateCalled}`,
        );
      }
    }

    expect(timesNavigateCalled).toBe(completedLevels + 1);
    expect(mockNavigate).toHaveBeenCalledTimes(completedLevels + 1);
  });
});
