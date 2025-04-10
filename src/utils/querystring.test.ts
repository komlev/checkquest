import { describe, it, expect } from "vitest";
import { stringify } from "./querystring";

describe("stringify", () => {
  it("should convert object to query string", () => {
    const params = {
      name: "John",
      age: 30,
      active: true,
    };
    expect(stringify(params)).toBe("name=John&age=30&active=true");
  });

  it("should add question mark prefix when addPrefix is true", () => {
    const params = {
      name: "John",
    };
    expect(stringify(params, true)).toBe("?name=John");
  });

  it("should skip undefined values", () => {
    const params = {
      name: "John",
      age: undefined,
      active: true,
    };
    expect(stringify(params)).toBe("name=John&active=true");
  });

  it("should handle empty object", () => {
    expect(stringify({})).toBe("");
  });

  it("should handle special characters", () => {
    const params = {
      search: "test & value",
      filter: "category=1",
    };
    expect(stringify(params)).toBe("search=test+%26+value&filter=category%3D1");
  });

  it("should handle array values", () => {
    const params = {
      tags: ["react", "typescript"],
    };
    expect(stringify(params)).toBe("tags=react%2Ctypescript");
  });
});
