import { describe, expect, it } from "vitest";
import { Porte } from "./porte";
import { Item } from "./porte.ts"
import { Joueur } from "./porte.ts";
import { Room } from "./porte.ts";
import { Alarme } from "./porte.ts";
import { AlarmeCode } from "./porte";

describe("Porte", () => {
  it("Une porte fermée ne peut être franchie", () => {

    const alarme = new Alarme;

    const porte = new Porte(false, "rouge", false);

    expect(porte.franchir(alarme)).toBe(false);
  });

  it("Une porte ouverte peut être franchie", () => {

    const alarme = new Alarme;

    const porte = new Porte(true, "bleu", false);
    porte.enigmResolved = true;
    const clef = new Item("clef", "bleu");
    const joueur = new Joueur();
    joueur.inventoryAddItem(clef);

    porte.openTheDoor(joueur);

    expect(porte.franchir(alarme)).toBe(true);
  });

  it("le joueur peut ouvrir la porte s'il possède la clé correspondante", () => {

    const porte = new Porte(false, "rouge", false);

    const clef = new Item("clef", "rouge");

    const joueur = new Joueur();
    joueur.inventoryAddItem(clef);

    porte.openTheDoor(joueur);

    expect(porte.open).toBe(true);
  });

  it("le joueur ne peut pas ouvrir la porte s'il ne possède pas la clé correspondante", () => {

    const porte = new Porte(false, "bleu", false);
    const clef = new Item("clef", "rouge");

    const joueur = new Joueur();
    joueur.inventoryAddItem(clef);

    porte.openTheDoor(joueur);

    expect(porte.open).toBe(false);
  });

  it("Lorsqu'une clé est utilisée pour ouvrir une porte, elle est retirée de l'inventaire du joueur", () => {

    const porte = new Porte(false, "bleu", false);

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

    const alarme = new Alarme;

    const joueur = new Joueur();
    joueur.setResponse("jonhatan");

    const porte = new Porte(true, "rouge", false);
    porte.ask(joueur);

    expect(porte.enigmResolved).toBe(true);
    expect(porte.open).toBe(true);
    expect(porte.franchir(alarme)).toBe(true);

  })

  it("Enigme : le joueur donne une mauvaise réponse", () => {

    const alarme = new Alarme;

    const joueur = new Joueur();
    joueur.setResponse("jonhat");

    const porte = new Porte(true, "rouge", false);
    porte.ask(joueur);

    expect(porte.franchir(alarme)).toBe(false);

  })

  it("Une porte dont l'enigme n'est pas résolue ne peut être franchie", () => {

    const alarme = new Alarme;

    const porte = new Porte(true, "rouge", false);

    expect(porte.franchir(alarme)).toBe(false);

  })

  it("Une porte dont l'enigme n'est pas résolue ne peut être franchie", () => {

    const alarme = new Alarme;

    const porte = new Porte(true, "rouge", false);

    expect(porte.franchir(alarme)).toBe(false);

  })

  it("Après 3 tentative de résolution, le joueur prend un dégat", () => {

    const alarme = new Alarme;

    const joueur = new Joueur();
    

    expect(joueur.degat).toBe(0);

    const porte = new Porte(true, "rouge", false);

    joueur.setResponse("jonhat");
    porte.ask(joueur);
    joueur.setResponse("jonh");
    porte.ask(joueur);
    joueur.setResponse("jo");
    porte.ask(joueur);

    expect(porte.franchir(alarme)).toBe(false);
    expect(joueur.degat).toBe(1);
  })

  it("Une porte concernée par l'alarme ne peut être franchie lorsque l'alarme est active", () => {

    const alarme = new Alarme();
    alarme.activate();

    const porte = new Porte(true, "rouge", true);

    expect(porte.franchir(alarme)).toBe(false);

  })


  it("Une porte concernée par l'alarme peut être franchie lorsque l'alarme est inactive", () => {

    const alarme = new Alarme();

    const porte = new Porte(true, "rouge", true);
    porte.enigmResolved = true;

    expect(porte.franchir(alarme)).toBe(true);

  })


  it("Une porte non concernée par l'alarme peut être franchie lorsque l'alarme est active", () => {

    const alarme = new Alarme();
    alarme.activate();

    const porte = new Porte(true, "rouge", false);
    porte.enigmResolved = true;

    expect(porte.franchir(alarme)).toBe(true);

  })

  it("Un objet AlarmeCode qui contient le bon code permet de désactiver l'alarme", () => {

    const alarmeCode = new AlarmeCode("boncode");

    const alarme = new Alarme()
    alarme.activate();

    const joueur = new Joueur();
    joueur.inventoryAddItem(alarmeCode);

    if(joueur.getAlarmeCode()) {
      alarme.desactivate(joueur);
    }

    

    expect(alarme.active).toBe(false);
  })

  it("Un objet AlarmeCode qui contient un mauvais code ne désactive pas l'alarme", () => {

    const alarmeCode = new AlarmeCode("mauvaiscode");

    const alarme = new Alarme()
    alarme.activate();

    const joueur = new Joueur();
    joueur.inventoryAddItem(alarmeCode);

    if(joueur.getAlarmeCode()) {
      alarme.desactivate(joueur);
    }

    

    expect(alarme.active).toBe(true);

  })

  it("Une alarme ne peut être désactiver sans objet AlarmeCode", () => {

    const alarme = new Alarme()
    alarme.activate();

    const joueur = new Joueur();

    alarme.desactivate(joueur);

    expect(alarme.active).toBe(true);

  })

  it("Un objet AlarmeCode disparait de l'inventaire après utilisation", () => {

    const alarmeCode = new AlarmeCode("boncode");

    const alarme = new Alarme()
    alarme.activate();

    const joueur = new Joueur();
    joueur.inventoryAddItem(alarmeCode);

    expect(joueur.inventory).toStrictEqual([alarmeCode]);

    if(joueur.getAlarmeCode()) {
      alarme.desactivate(joueur);
    }

    expect(alarme.active).toBe(false);
    expect(joueur.inventory).toStrictEqual([]);

  })

    it("Une porte ne peut être franchie si aucune condition n'est réunie", () => {

    const alarmeCode = new AlarmeCode("mauvaisCode");

    const alarme = new Alarme()
    alarme.activate();

    const joueur = new Joueur();
    joueur.inventoryAddItem(alarmeCode);
    joueur.setResponse("jonh");

    alarme.desactivate(joueur);

    const porte = new Porte(false, "bleu", true);

    const clef = new Item("clef", "rouge");
    joueur.inventoryAddItem(clef);

    porte.ask(joueur);
    porte.openTheDoor(joueur);

    expect(porte.franchir(alarme)).toBe(false);
  })


    it("Une porte ne peut être franchie si le joueur ne possède que la bonne clée", () => {

    const alarmeCode = new AlarmeCode("mauvaisCode");

    const alarme = new Alarme()
    alarme.activate();

    const joueur = new Joueur();
    joueur.inventoryAddItem(alarmeCode);
    joueur.setResponse("jonh");

    alarme.desactivate(joueur);

    const porte = new Porte(false, "rouge", true);

    const clef = new Item("clef", "rouge");
    joueur.inventoryAddItem(clef);

    porte.ask(joueur);
    porte.openTheDoor(joueur);

    expect(porte.franchir(alarme)).toBe(false);
  })


    it("Une porte ne peut être franchie si le joueur ne possède que la bonne réponse à l'énigme", () => {

    const alarmeCode = new AlarmeCode("mauvaisCode");

    const alarme = new Alarme()
    alarme.activate();

    const joueur = new Joueur();
    joueur.inventoryAddItem(alarmeCode);
    joueur.setResponse("jonhatan");

    alarme.desactivate(joueur);

    const porte = new Porte(false, "rouge", true);

    const clef = new Item("clef", "bleu");
    joueur.inventoryAddItem(clef);

    porte.ask(joueur);
    porte.openTheDoor(joueur);

    expect(porte.franchir(alarme)).toBe(false);
  })


    it("Une porte ne peut être franchie si seulement l'alarme est désactivée", () => {

    const alarmeCode = new AlarmeCode("boncode");

    const alarme = new Alarme()
    alarme.activate();

    const joueur = new Joueur();
    joueur.inventoryAddItem(alarmeCode);
    joueur.setResponse("jonh");

    alarme.desactivate(joueur);

    const porte = new Porte(false, "bleu", true);

    const clef = new Item("clef", "rouge");
    joueur.inventoryAddItem(clef);

    porte.ask(joueur);
    porte.openTheDoor(joueur);

    expect(porte.franchir(alarme)).toBe(false);
    })


    it("Une porte ne peut pas être franchie si seulement la clé et l'énigme sont bonnes", () => {

    const alarmeCode = new AlarmeCode("mauvaiscode");

    const alarme = new Alarme()
    alarme.activate();

    const joueur = new Joueur();
    joueur.inventoryAddItem(alarmeCode);
    joueur.setResponse("jonhatan");

    alarme.desactivate(joueur);

    const porte = new Porte(false, "rouge", true);

    const clef = new Item("clef", "rouge");
    joueur.inventoryAddItem(clef);

    porte.ask(joueur);
    porte.openTheDoor(joueur);

    expect(porte.franchir(alarme)).toBe(false);
    })

    it("Une porte ne peut pas être franchie si seulement la clé est bonne et l'alarme désativée", () => {

    const alarmeCode = new AlarmeCode("boncode");

    const alarme = new Alarme()
    alarme.activate();

    const joueur = new Joueur();
    joueur.inventoryAddItem(alarmeCode);
    joueur.setResponse("jonh");

    alarme.desactivate(joueur);

    const porte = new Porte(false, "rouge", true);

    const clef = new Item("clef", "rouge");
    joueur.inventoryAddItem(clef);

    porte.ask(joueur);
    porte.openTheDoor(joueur);

    expect(porte.franchir(alarme)).toBe(false);
    })


    it("Une porte ne peut pas être franchie si seulement l'énigme est bonne et l'alarme désativée", () => {

    const alarmeCode = new AlarmeCode("boncode");

    const alarme = new Alarme()
    alarme.activate();

    const joueur = new Joueur();
    joueur.inventoryAddItem(alarmeCode);
    joueur.setResponse("jonhatan");

    alarme.desactivate(joueur);

    const porte = new Porte(false, "bleu", true);

    const clef = new Item("clef", "rouge");
    joueur.inventoryAddItem(clef);

    porte.ask(joueur);
    porte.openTheDoor(joueur);

    expect(porte.franchir(alarme)).toBe(false);
    })


    it("Une porte peut être franchie si l'énigme est bonne, la clée est bonne, et l'alarme désativée", () => {

    const alarmeCode = new AlarmeCode("boncode");

    const alarme = new Alarme()
    alarme.activate();

    const joueur = new Joueur();
    joueur.inventoryAddItem(alarmeCode);
    joueur.setResponse("jonhatan");

    alarme.desactivate(joueur);

    const porte = new Porte(false, "rouge", true);

    const clef = new Item("clef", "rouge");
    joueur.inventoryAddItem(clef);

    porte.ask(joueur);
    porte.openTheDoor(joueur);

    expect(porte.open).toBe(true);
    expect(porte.enigmResolved).toBe(true);
    expect(porte.franchir(alarme)).toBe(true);
    })

});