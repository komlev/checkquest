import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTheme } from "./useTheme";

describe("useTheme", () => {
  const mockLocalStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
  };

  const mockMatchMedia = {
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  };

  beforeEach(() => {
    vi.stubGlobal("localStorage", mockLocalStorage);
    vi.stubGlobal("window", {
      matchMedia: vi.fn().mockReturnValue(mockMatchMedia),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it("should initialize with dark theme if localStorage has isdark=true", () => {
    mockLocalStorage.getItem.mockReturnValue("true");
    const { result } = renderHook(() => useTheme());
    expect(result.current.isdark).toBe(true);
  });

  it("should initialize with light theme if localStorage has isdark=false", () => {
    mockLocalStorage.getItem.mockReturnValue("false");
    const { result } = renderHook(() => useTheme());
    expect(result.current.isdark).toBe(false);
  });

  it("should update localStorage when theme changes", () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.setIsdark(true);
    });

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      "isdark",
      JSON.stringify(true)
    );
  });

  it("should handle localStorage errors gracefully", () => {
    mockLocalStorage.getItem.mockImplementation(() => {
      throw new Error("Storage error");
    });
    mockMatchMedia.matches = true;

    const { result } = renderHook(() => useTheme());
    expect(result.current.isdark).toBe(true);
  });
});
