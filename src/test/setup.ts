import "@testing-library/jest-dom";
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Extend expect with jest-dom matchers
expect.extend({
  toBeInTheDocument: (received) => {
    const pass = document.body.contains(received);
    return {
      pass,
      message: () =>
        `expected ${received} ${pass ? "not " : ""}to be in the document`,
    };
  },
});

// Cleanup after each test
afterEach(() => {
  cleanup();
});
