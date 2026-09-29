export class Porte {
    open: boolean = false;

    franchir(): boolean {
        if (!this.open) {
            return false;
        }
        return true;
    }
}