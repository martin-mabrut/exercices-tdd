import { describe, expect, it } from "vitest";
import { Porte } from "./porte";
import { Item } from "./porte.ts"
import { Joueur } from "./porte.ts";

describe("Porte", () => {
  it("Une porte fermée ne peut être franchie", () => {

    const porte = new Porte(false, "rouge");

    expect(porte.franchir()).toBe(false);
  });

  it("Une porte ouverte peut être franchie", () => {

    const porte = new Porte(true, "bleu");
    const clef = new Item("clef", "bleu");
    const joueur = new Joueur();
    joueur.inventoryAddItem(clef);

    porte.openTheDoor(joueur);

    expect(porte.franchir()).toBe(true);
  });

  it("le joueur peut ouvrir la porte s'il possède la clé correspondante", () => {

    const porte = new Porte(false, "rouge");

    const clef = new Item("clef", "rouge");

    const joueur = new Joueur();
    joueur.inventoryAddItem(clef);

    porte.openTheDoor(joueur);

    expect(porte.open).toBe(true);
  });

  it("le joueur ne peut pas ouvrir la porte s'il ne possède pas la clé correspondante", () => {

    const porte = new Porte(false, "bleu");
    const clef = new Item("clef", "rouge");

    const joueur = new Joueur();
    joueur.inventoryAddItem(clef);
    
    porte.openTheDoor(joueur);

    expect(porte.open).toBe(false);
  });

  it("Lorsqu'une clé est utilisée pour ouvrir une porte, elle est retirée de l'inventaire du joueur", () => {

    const porte = new Porte(false, "bleu");

    const clef1 = new Item("clef", "vert");
    const clef2 = new Item("clef", "bleu");

    const joueur = new Joueur();

    joueur.inventoryAddItem(clef1);
    joueur.inventoryAddItem(clef2);

    porte.openTheDoor(joueur);

    expect(joueur.inventory).toStrictEqual([clef1]);
  });
});