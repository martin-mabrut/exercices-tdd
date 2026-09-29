import { describe, expect, it } from "vitest";
import { Porte } from "./porte";

describe("Porte", () => {
  it("Une porte fermée ne peut être franchie", () => {

    const porte = new Porte();

    expect(porte.franchir()).toBe(false);
  });
});