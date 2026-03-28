import { beforeEach, describe, expect, it } from "vitest";
import type { Checklist } from "../types";
import {
  $checklistsStore,
  exportChecklist,
  importChecklist,
} from "./checklistStore";

const makeChecklist = (overrides: Partial<Checklist> = {}): Checklist => ({
  id: "test-id",
  name: "Test Checklist",
  sections: [
    {
      id: "s1",
      title: "Section 1",
      questions: [
        { id: "q1", text: "Question 1", score: 1 },
        { id: "q2", text: "Question 2", score: 2, extra: true },
      ],
    },
  ],
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
  ...overrides,
});

const encode = (value: unknown) => btoa(JSON.stringify(value));

beforeEach(() => {
  $checklistsStore.set([]);
});

describe("importChecklist", () => {
  it("returns null for an empty string", () => {
    expect(importChecklist("")).toBeNull();
  });

  it("returns null for a non-base64 string", () => {
    expect(importChecklist("not-base64!!!")).toBeNull();
  });

  it("returns null for valid base64 that is not JSON", () => {
    expect(importChecklist(btoa("not json"))).toBeNull();
  });

  it("returns null when id is missing", () => {
    const { id: _id, ...noId } = makeChecklist();
    expect(importChecklist(encode(noId))).toBeNull();
  });

  it("returns null when name is missing", () => {
    const { name: _name, ...noName } = makeChecklist();
    expect(importChecklist(encode(noName))).toBeNull();
  });

  it("returns null when sections is not an array", () => {
    expect(
      importChecklist(encode(makeChecklist({ sections: "bad" as never }))),
    ).toBeNull();
  });

  it("returns null when a section is missing its questions array", () => {
    const bad = makeChecklist({
      sections: [{ id: "s1", title: "S1", questions: "bad" as never }],
    });
    expect(importChecklist(encode(bad))).toBeNull();
  });

  it("returns null when a question has a non-numeric score", () => {
    const bad = makeChecklist({
      sections: [
        {
          id: "s1",
          title: "S1",
          questions: [{ id: "q1", text: "Q1", score: "ten" as never }],
        },
      ],
    });
    expect(importChecklist(encode(bad))).toBeNull();
  });

  it("returns null when createdAt is missing", () => {
    const { createdAt: _c, ...noCreatedAt } = makeChecklist();
    expect(importChecklist(encode(noCreatedAt))).toBeNull();
  });

  it("imports a valid checklist and returns its id", () => {
    const checklist = makeChecklist();
    const id = importChecklist(encode(checklist));
    expect(id).toBe("test-id");
    expect($checklistsStore.get()).toHaveLength(1);
    expect($checklistsStore.get()[0].name).toBe("Test Checklist");
  });

  it("imports a checklist with empty sections array", () => {
    const checklist = makeChecklist({ sections: [] });
    const id = importChecklist(encode(checklist));
    expect(id).toBe("test-id");
  });

  it("assigns a new id and appends (Copy) when the id already exists", () => {
    const checklist = makeChecklist();
    $checklistsStore.set([checklist]);

    const id = importChecklist(encode(checklist));
    expect(id).not.toBe("test-id");
    const imported = $checklistsStore.get().find((c) => c.id === id);
    expect(imported?.name).toBe("Test Checklist (Copy)");
    expect($checklistsStore.get()).toHaveLength(2);
  });

  it("round-trips with exportChecklist", () => {
    const checklist = makeChecklist();
    $checklistsStore.set([checklist]);

    const encoded = exportChecklist("test-id");
    expect(encoded).not.toBeNull();
    if (!encoded) return;

    $checklistsStore.set([]);
    const id = importChecklist(encoded);
    expect(id).toBe("test-id");
    expect($checklistsStore.get()[0]).toMatchObject({
      id: "test-id",
      name: "Test Checklist",
    });
  });
});
