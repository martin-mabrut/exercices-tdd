import { describe, expect, it } from "vitest";
import { Porte } from "./porte";

describe("Porte", () => {
  it("Une porte fermée ne peut être franchie", () => {

    const porte = new Porte();

    expect(porte.franchir()).toBe(false);
  });

  it("Une porte ouverte peut être franchie", () => {

    const porte = new Porte();

    porte.openTheDoor();

    expect(porte.franchir()).toBe(true);
  });
});