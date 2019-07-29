import { AbstractType } from "../types/abstractType";

const DEFAULT_MULTIPLIER = 1;

export class Recursive implements AbstractType {
    private type: AbstractType;

    public constructor(mapping: AbstractType) {
        this.type = mapping;
    }

    public forBuffer(view: DataView, currentIndex: number, value: any[], object?: any): void {
        let index = currentIndex;
        value.forEach((a: any) => {
            this.type.forBuffer(view, index, a, a);
            index += this.type.indexIncremental();
        });
    }

    public forObject(view: DataView, currentIndex: number, resolved?: any): object {
        let index = currentIndex;
        const results = [];

        const amount = Math.floor((view.byteLength - currentIndex) / this.indexIncremental(DEFAULT_MULTIPLIER));

        for (let i = 0; i < amount; i++) {
            results.push(this.type.forObject(view, index, resolved));
            index += this.type.indexIncremental();
        }

        return results;
    }

    public indexIncremental(amount: number): number {
        return this.type.indexIncremental() * amount;
    }
}
