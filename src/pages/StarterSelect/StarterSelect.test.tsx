import { fireEvent, render, screen } from "@testing-library/react";
import { LOCALSTORAGE_SAVE_KEY, STARTER_POKEMON } from "../../Constants";
import { POKEMON_DATA } from "../../data/pokemon";
import StarterSelect from "./StarterSelect";

const mockNavigate = jest.fn();

jest.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

function saveStarter(starter: string | null) {
  localStorage.setItem(
    LOCALSTORAGE_SAVE_KEY,
    JSON.stringify({
      completedLevels: [false, false, false],
      starter,
    }),
  );
}

describe("StarterSelect", () => {
  beforeEach(() => {
    localStorage.clear();
    mockNavigate.mockReset();
  });

  it("renders starter cards and keeps confirm disabled before a selection", () => {
    render(<StarterSelect />);

    for (const starterId of STARTER_POKEMON) {
      expect(screen.getByText(POKEMON_DATA[starterId].name)).toBeInTheDocument();
      expect(screen.getByText(POKEMON_DATA[starterId].type)).toBeInTheDocument();
      expect(
        screen.getByRole("img", { name: POKEMON_DATA[starterId].name }),
      ).toBeInTheDocument();
    }

    expect(screen.getByRole("button", { name: "Pick a Pokemon" })).toBeDisabled();
  });

  it("marks a clicked card as selected and enables confirmation", () => {
    render(<StarterSelect />);

    const squirtleCard = screen.getByText("Squirtle").closest("div");
    expect(squirtleCard).not.toHaveClass("selected");

    fireEvent.click(squirtleCard!);

    expect(squirtleCard).toHaveClass("selected");
    expect(screen.getByRole("button", { name: "I choose you!" })).toBeEnabled();
  });

  it("preselects the persisted starter from local storage", () => {
    saveStarter("charmander");
    render(<StarterSelect />);

    const charmanderCard = screen.getByText("Charmander").closest("div");
    expect(charmanderCard).toHaveClass("selected");
    expect(screen.getByRole("button", { name: "I choose you!" })).toBeEnabled();
  });

  it("saves selected starter and navigates to levels on confirm", () => {
    render(<StarterSelect />);

    fireEvent.click(screen.getByText("Bulbasaur"));
    fireEvent.click(screen.getByRole("button", { name: "I choose you!" }));

    const persistedSave = JSON.parse(
      localStorage.getItem(LOCALSTORAGE_SAVE_KEY) ?? "{}",
    );
    expect(persistedSave.starter).toBe("bulbasaur");
    expect(persistedSave.completedLevels).toEqual([false, false, false]);
    expect(mockNavigate).toHaveBeenCalledWith("/levels");
  });

  it("does not navigate when confirm is clicked without a selection", () => {
    render(<StarterSelect />);

    const confirmButton = screen.getByRole("button", { name: "Pick a Pokemon" });
    fireEvent.click(confirmButton);

    expect(confirmButton).toBeDisabled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
