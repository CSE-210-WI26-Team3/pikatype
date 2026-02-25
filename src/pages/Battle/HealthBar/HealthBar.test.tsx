import { render, screen } from "@testing-library/react";
import { HealthBar } from "./HealthBar";
import {
  TimerContext,
  TimerModel,
  TimerState,
  TimerStateAction,
  TimerStatus,
} from "../Timer/TimerProvider";

function calculateHealth(timerState: TimerState) {
  return Math.floor((timerState.currentTime / timerState.maxTime) * 100);
}

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
    const timerState = {
      currentTime: 60,
      maxTime: 60,
      status: TimerStatus.Initialized,
    };

    const playerHealth = calculateHealth(timerState);

    render(<HealthBar percentValue={playerHealth} />);

    const healthbar = document.getElementById("healthbar-indicator");
    expect(healthbar).toBeTruthy();
    const healthbarWidth = getComputedStyle(healthbar!).width;

    expect(healthbar).toBeVisible();
    expect(healthbarWidth).toMatch(/100%/);
  });

  test("healthbar decreases upon time change", async () => {
    const timerState: TimerState = {
      currentTime: 47,
      maxTime: 60,
      status: TimerStatus.Ongoing,
    };

    const playerHealth = calculateHealth(timerState);

    const { rerender } = render(<HealthBar percentValue={playerHealth} />);

    const currentHealthBar = document.getElementById("healthbar-indicator");
    expect(currentHealthBar).toBeTruthy();
    expect(currentHealthBar).toBeVisible();
    const currentHealthBarWidth = getComputedStyle(currentHealthBar!).width;
    expect(currentHealthBarWidth).toBeTruthy();

    // simulate time change by updating timer model state
    const newTimerState: TimerState = {
      currentTime: 46,
      maxTime: 60,
      status: TimerStatus.Ongoing,
    };

    const newPlayerHealth = calculateHealth(newTimerState);

    rerender(<HealthBar percentValue={newPlayerHealth} />);

    const newHealthBar = document.getElementById("healthbar-indicator");
    expect(newHealthBar).toBeTruthy();
    expect(newHealthBar).toBeVisible();
    const newHealthBarWidth = getComputedStyle(newHealthBar!).width;
    expect(newHealthBarWidth).not.toMatch(currentHealthBarWidth);
  });

  test("empty health bar at 0 health", () => {
    const timerState: TimerState = {
      currentTime: 0,
      maxTime: 60,
      status: TimerStatus.Done,
    };

    const playerHealth = calculateHealth(timerState);

    render(<HealthBar percentValue={playerHealth} />);

    const healthBar = document.getElementById("healthbar-indicator");
    expect(healthBar).toBeTruthy();
    expect(healthBar).toBeVisible();
    const healthBarWidth = getComputedStyle(healthBar!).width;
    expect(healthBarWidth).toMatch(/0%/);
  });
});
