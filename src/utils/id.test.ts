import { describe, expect, it } from "vitest";
import { getId } from "./id";

describe("getId", () => {
  it("should generate a string of length 5", () => {
    const id = getId();
    expect(id).toHaveLength(5);
  });

  it("should generate different IDs on each call", () => {
    const id1 = getId();
    const id2 = getId();
    expect(id1).not.toBe(id2);
  });

  it("should generate IDs containing only valid characters", () => {
    const id = getId();
    expect(id).toMatch(/^[A-Za-z0-9_-]{5}$/);
  });

  it("should generate 1000 unique IDs", () => {
    const ids = new Set();
    for (let i = 0; i < 1000; i++) {
      ids.add(getId());
    }
    expect(ids.size).toBe(1000);
  });
});
