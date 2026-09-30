import { describe, expect, it } from "vitest";
import { Porte } from "./porte";
import { Item } from "./porte.ts"
import { Joueur } from "./porte.ts";
import { Room } from "./porte.ts";

describe("Porte", () => {
  it("Une porte fermée ne peut être franchie", () => {

    const porte = new Porte(false, "rouge");

    expect(porte.franchir()).toBe(false);
  });

  it("Une porte ouverte peut être franchie", () => {

    const porte = new Porte(true, "bleu");
    porte.enigmResolved = true;
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

  it("Lorsqu'un joueur ramasse un objet, celui-ci est ajouté à son inventaire et retiré de la salle", () => {

    const joueur = new Joueur();
    const epee = new Item("épée", "dorée")
    const room = new Room([epee]);

    room.pickUpItem(epee, joueur);


    expect(joueur.inventory).toStrictEqual([epee]);
    expect(room.items).toStrictEqual([]);
  });

  it("Un objet déjà ramassé ne peut pas être ramassé une seconde fois", () => {

    const joueur = new Joueur();
    const epee1 = new Item("super épée", "dorée")
    const epee2 = new Item("épée", "argentée")

    const room = new Room([epee1, epee2]);

    room.pickUpItem(epee1, joueur);
    room.pickUpItem(epee1, joueur);


    expect(joueur.inventory).toStrictEqual([epee1]);
    expect(room.items).toStrictEqual([epee2]);
  });

  it("Un joueur ne peut utiliser qu'un objet qu'il possède dans son inventaire", () => {

    const joueur = new Joueur();
    
    const item = new Item("epee", "vert");
    const item2 = new Item("couteau", "rose");

    joueur.inventoryAddItem(item);

    expect(joueur.useItem(item)).toBe(true);
    expect(joueur.useItem(item2)).toBe(false);
  });

  it("Pour franchir la porte, l’énigme doit avoir été résolue", () => {

    const joueur = new Joueur();
    joueur.setResponse("jonhatan");

    const porte = new Porte(true, "rouge");
    porte.ask(joueur);

    expect(porte.enigmResolved).toBe(true);
    expect(porte.open).toBe(true);
    expect(porte.franchir()).toBe(true);

  })

  it("Enigme : le joueur donne une mauvaise réponse", () => {

    const joueur = new Joueur();
    joueur.setResponse("jonhat");

    const porte = new Porte(true, "rouge");
    porte.ask(joueur);

    expect(porte.franchir()).toBe(false);

  })

  it("Une porte dont l'enigme n'est pas résolue ne peut être franchie", () => {

    const porte = new Porte(true, "rouge");

    expect(porte.franchir()).toBe(false);

  })

  it("Une porte dont l'enigme n'est pas résolue ne peut être franchie", () => {

    const porte = new Porte(true, "rouge");

    expect(porte.franchir()).toBe(false);

  })

  it("Après 3 tentative de résolution, le joueur prend un dégat", () => {

    const joueur = new Joueur();
    

    expect(joueur.degat).toBe(0);

    const porte = new Porte(true, "rouge");

    joueur.setResponse("jonhat");
    porte.ask(joueur);
    joueur.setResponse("jonh");
    porte.ask(joueur);
    joueur.setResponse("jo");
    porte.ask(joueur);

    expect(porte.franchir()).toBe(false);
    expect(joueur.degat).toBe(1);
  })



});