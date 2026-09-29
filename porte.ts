export class Porte {
    open: boolean = false;

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