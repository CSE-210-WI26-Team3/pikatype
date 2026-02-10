import { render, screen } from "@testing-library/react";
import HealthBar from "./index";
import {
  TimerContext,
  TimerModel,
  TimerStateAction,
} from "../Timer/timerContext";

/**
 * Mocking the timer component and only testing healthbar UI updates properly
 * at various timer states
 */
describe("player health bar tests", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    // making sure the health bar actually has space in the test window to
    // render
    global.innerWidth = 500;
    global.innerHeight = 500;
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test("loads and displays healthbar at full health", async () => {
    const timerModel: TimerModel = {
      timerState: {
        currentTime: 60,
        maxTime: 60,
        state: "initialized",
      },
      dispatch: jest.fn<void, [TimerStateAction]>(),
    };

    render(
      <TimerContext.Provider value={timerModel}>
        <HealthBar />
      </TimerContext.Provider>,
    );

    const healthbar = screen.getByRole("healthbar-indicator");
    const healthbarWidth = getComputedStyle(healthbar).width;

    expect(healthbar).toBeVisible();
    expect(healthbarWidth).toMatch(/100%/);
  });

  test("healthbar decreases upon time change", async () => {
    const timerModel: TimerModel = {
      timerState: {
        currentTime: 47,
        maxTime: 60,
        state: "ongoing",
      },
      dispatch: jest.fn<void, [TimerStateAction]>(),
    };

    const { rerender } = render(
      <TimerContext.Provider value={timerModel}>
        <HealthBar />
      </TimerContext.Provider>,
    );

    const currentHealthBar = screen.getByRole("healthbar-indicator");
    const currentHealthBarWidth = getComputedStyle(currentHealthBar).width;
    expect(currentHealthBar).toBeVisible();
    expect(currentHealthBarWidth).toBeTruthy();

    // simulate time change by updating timer model state
    timerModel.timerState = {
      currentTime: 46,
      maxTime: 60,
      state: "ongoing",
    };

    rerender(
      <TimerContext.Provider value={timerModel}>
        <HealthBar />
      </TimerContext.Provider>,
    );

    const newHealthBar = screen.getByRole("healthbar-indicator");
    const newHealthBarWidth = getComputedStyle(newHealthBar).width;
    expect(newHealthBar).toBeVisible();
    expect(newHealthBarWidth).not.toMatch(currentHealthBarWidth);
  });

  test("empty health bar at 0 health", () => {
    const timerModel: TimerModel = {
      timerState: {
        currentTime: 0,
        maxTime: 60,
        state: "done",
      },
      dispatch: jest.fn<void, [TimerStateAction]>(),
    };

    render(
      <TimerContext.Provider value={timerModel}>
        <HealthBar />
      </TimerContext.Provider>,
    );

    const healthBar = screen.getByRole("healthbar-indicator");
    const healthBarWidth = getComputedStyle(healthBar).width;
    expect(healthBar).toBeVisible();
    expect(healthBarWidth).toMatch(/0%/);
  });
});
