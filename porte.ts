export class Porte {
    open: boolean = false;
    color: string;
    enigm: string = "Qu'est-ce qui est jaune et qui attend ?";
    enigmResponse: string = "jonhatan";
    enigmResolved: boolean = false;

    constructor(open: boolean, color: string) {
        this.open = open;
        this.color = color;
    }

    openTheDoor(joueur: Joueur): void {
        joueur.inventory.some((item) => {
            if(item.name === "clef" && item.color === this.color) {
                this.open = true;
                joueur.inventoryRemove(item);
            }
        })
    }

    ask(joueur: Joueur): void {
        if(joueur.response === this.enigmResponse) {
            this.enigmResolved = true;
            return;
        } 

        this.enigmResolved = false;
    }

    franchir(): boolean {
        if (this.open === true && this.enigmResolved === true) {
            return true;
        }
        return false;
    }
}

export class Item {
    name: string;
    color: string; 

    constructor(name: string, color: string) {
        this.name = name;
        this.color = color;
    }
}

export class Joueur {
    inventory: Item[] = [];
    response: string = "";

    constructor() {
    }

    inventoryAddItem(item: Item){
        this.inventory.push(item);
    }

    inventoryRemove(item: Item): void{
        const index = this.inventory.indexOf(item);
        this.inventory.splice(index, 1);
       // this.inventory.find((i) => i.name === item.name)
    }

    useItem(item: Item): boolean {

        const itemFound = this.inventory.find((i) => i === item);

        if(itemFound) {
            return true;
        } 
        return false;
    }

    setResponse(response: string) {
        this.response = response;
    }
}

export class Room {
    items: Item[];

    constructor(items: Item[]) {
        this.items = items;
    }

    pickUpItem(itemToPick: Item, joueur: Joueur): void {
        
            this.items.some((item) => {

            if(item.name === itemToPick.name) {
                const index = this.items.indexOf(item);
                this.items.splice(index, 1);

                joueur.inventoryAddItem(item);
            }
        })
        
    }
}