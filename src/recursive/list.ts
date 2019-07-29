import { Bufy } from "../bufy";
import { IBufferMapping } from "../models";
import { Nested } from "../special/nested";
import { AbstractType } from "../types/abstractType";

const DEFAULT_AMOUNT = 1;

export class List implements AbstractType {
    private amountIdentifier: string;
    private type: AbstractType;
    private identifierType: AbstractType;

    public constructor(amountIdentifier: string, type: AbstractType,
                       identifierType: AbstractType) {
        this.amountIdentifier = amountIdentifier;
        this.type = type;
        this.identifierType = identifierType;


    }

    public forBuffer(view: DataView, currentIndex: number, value: any[], object?: any): void {
        let index = currentIndex;
        this.identifierType.forBuffer(view, index - this.identifierType.indexIncremental(), value.length);

        value.forEach((a: any) => {
            this.type.forBuffer(view, index, a, object);
            index += this.type.indexIncremental();
        });
    }

    public forObject(view: DataView, currentIndex: number, resolved?: any): object {
        const amount = resolved[this.amountIdentifier];
        let index = currentIndex;
        const results = [];
        for (let i = 0; i < amount; i++) {
            results.push(this.type.forObject(view, index, resolved));
            index += this.type.indexIncremental();
        }

        return results;
    }

    public indexIncremental(amount: number = 1, array: any[]): number {
        let length: number = 0;

        if (!(this.type instanceof Nested) || !array) {
            return this.type.indexIncremental() * amount;
        }

        const type = this.type as Nested;
        const keys = type.getKeys();
        const mapping = type.getBufferMapping();

        array.forEach((a: any) => {
            keys.forEach((v: string) => {
                const value = a && a[v];
                const abstractType = mapping[v] as AbstractType;
                length += abstractType.indexIncremental(Array.isArray(value) && value.length || DEFAULT_AMOUNT, value);
            });
        });

        return length;
    }
}
