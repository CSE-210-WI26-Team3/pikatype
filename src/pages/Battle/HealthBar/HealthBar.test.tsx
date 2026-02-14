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

    const healthbar = document.getElementById("healthbar-indicator");
    expect(healthbar).toBeTruthy();
    const healthbarWidth = getComputedStyle(healthbar!).width;

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

    const currentHealthBar = document.getElementById("healthbar-indicator");
    expect(currentHealthBar).toBeTruthy();
    expect(currentHealthBar).toBeVisible();
    const currentHealthBarWidth = getComputedStyle(currentHealthBar!).width;
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

    const newHealthBar = document.getElementById("healthbar-indicator");
    expect(newHealthBar).toBeTruthy();
    expect(newHealthBar).toBeVisible();
    const newHealthBarWidth = getComputedStyle(newHealthBar!).width;
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

    const healthBar = document.getElementById("healthbar-indicator");
    expect(healthBar).toBeTruthy();
    expect(healthBar).toBeVisible();
    const healthBarWidth = getComputedStyle(healthBar!).width;
    expect(healthBarWidth).toMatch(/0%/);
  });
});
