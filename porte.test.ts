import { describe, expect, it } from "vitest";
import { Porte } from "./porte";
import { Clef } from "./porte.ts"
import { Joueur } from "./porte.ts";

describe("Porte", () => {
  it("Une porte fermée ne peut être franchie", () => {

    const porte = new Porte(false, "rouge");

    expect(porte.franchir()).toBe(false);
  });

  it("Une porte ouverte peut être franchie", () => {

    const porte = new Porte(true, "bleu");
    const clef = new Clef("bleu");
    const joueur = new Joueur(clef);

    porte.openTheDoor(joueur);

    expect(porte.franchir()).toBe(true);
  });

  it("le joueur peut ouvrir la porte s'il possède la clé correspondante", () => {

    const porte = new Porte(false, "rouge");
    const clef = new Clef("rouge");
    const joueur = new Joueur(clef);
    porte.openTheDoor(joueur);

    expect(porte.open).toBe(true);
  });

  it("le joueur ne peut pas ouvrir la porte s'il ne possède pas la clé correspondante", () => {

    const porte = new Porte(false, "bleu");
    const clef = new Clef("rouge");
    const joueur = new Joueur(clef);
    porte.openTheDoor(joueur);

    expect(porte.open).toBe(false);
  });
});