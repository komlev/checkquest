import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useTheme } from "./useTheme";

// Mock the useTheme hook
vi.mock("./useTheme", () => ({ useTheme: vi.fn() }));

describe("ThemeSwitcher", () => {
  const mockUseTheme = useTheme as vi.Mock;

  beforeEach(() => {
    mockUseTheme.mockReturnValue({
      isdark: false,
      setIsdark: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the theme switcher with light theme icon initially", () => {
    render(<ThemeSwitcher />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();

    // Sun icon should be visible (light theme)
    const sunIcon = screen.getByTestId("sun-icon");
    expect(sunIcon).toBeInTheDocument();
    expect(sunIcon).toHaveClass("swap-off");
  });

  it("renders the theme switcher with dark theme icon when isdark is true", () => {
    mockUseTheme.mockReturnValue({
      isdark: true,
      setIsdark: vi.fn(),
    });

    render(<ThemeSwitcher />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();

    // Moon icon should be visible (dark theme)
    const moonIcon = screen.getByTestId("moon-icon");
    expect(moonIcon).toBeInTheDocument();
    expect(moonIcon).toHaveClass("swap-on");
  });

  it("calls setIsdark when checkbox is toggled", () => {
    const setIsdark = vi.fn();
    mockUseTheme.mockReturnValue({
      isdark: false,
      setIsdark,
    });

    render(<ThemeSwitcher />);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(setIsdark).toHaveBeenCalledWith(true);
  });

  it("has correct accessibility attributes", () => {
    render(<ThemeSwitcher />);

    const label = screen.getByLabelText("Toggle theme");
    expect(label).toHaveAttribute("title", "Toggle theme");

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute(
      "aria-label",
      "Toggle between light and dark theme"
    );
    expect(checkbox).toHaveAttribute("aria-checked", "false");
  });
});
