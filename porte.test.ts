import { describe, expect, it } from "vitest";
import { Porte } from "./porte";

describe("Porte", () => {
  it("Une porte fermée ne peut être franchie", () => {

    const porte = new Porte(false, "rouge");

    expect(porte.franchir()).toBe(false);
  });

  it("Une porte ouverte peut être franchie", () => {

    const porte = new Porte(true, "bleu");

    porte.openTheDoor();

    expect(porte.franchir()).toBe(true);
  });

  it("le joueur peut ouvrir la porte s'il possède la clé correspondante", () => {

    const porte = new Porte("rouge");

    const clef = new Clef("rouge");

    expect(porte.openTheDoor(clef)).toBe(true);
  });

  it("le joueur peut ouvrir la porte s'il possède la clé correspondante", () => {

    const porte = new Porte("bleu");

    const clef = new Clef("rouge");

    expect(porte.openTheDoor(clef)).toBe(true);
  });
});