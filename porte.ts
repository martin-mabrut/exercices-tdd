export class Porte {
    open: boolean = false;
    color: string;

    constructor(open: boolean, color: string) {
        this.open = open;
        this.color = color;
    }

    openTheDoor(): void {
        this.open = true;
    }

    franchir(): boolean {
        if (!this.open) {
            return false;
        }
        return true;
    }
}

export class Clef {
    color: string; 

    constructor(color: string) {
        this.color = color;
    }
}