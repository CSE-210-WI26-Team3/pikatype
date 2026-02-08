import { render, screen } from "@testing-library/react";
import TimerProvider from "../Timer/TimerProvider";
import HealthBar from "./index";

test("loads and displays healthbar at full health", async () => {
  render(
    <TimerProvider time={60}>
      <HealthBar />
    </TimerProvider>,
  );

  const healthbar = screen.getByRole("healthbar");

  expect(healthbar).toBeVisible();
  expect(healthbar.getAttribute("aria-valuenow")).toBe("100");
});

test("healthbar decreases upon time change", async () => {
  const { rerender } = render(
    <TimerProvider time={60}>
      <HealthBar />
    </TimerProvider>,
  );

  const currentHealthBar = screen.getByRole("healthbar");
  expect(currentHealthBar).toBeVisible();
  const healthAriaAttribute = currentHealthBar.getAttribute("aria-valuenow");
  expect(healthAriaAttribute).toBeTruthy();
  const currentHealth = parseInt(healthAriaAttribute as string);
  expect(currentHealth).toBe(100);

  rerender(
    <TimerProvider time={59}>
      <HealthBar />
    </TimerProvider>,
  );

  const newHealthBar = screen.getByRole("healthbar");
  expect(newHealthBar).toBeVisible();
  const newHealthAriaAttribute = newHealthBar.getAttribute("aria-valuenow");
  expect(newHealthAriaAttribute).toBeTruthy();
  const newHealth = parseInt(newHealthAriaAttribute as string);

  expect(newHealth).toBeLessThan(currentHealth);
});
