import { AbstractType } from '../types/abstractType';
import { Bufy } from '../bufy';

export class FixedRecursive implements AbstractType {
    private _amountIdentifier: string;
    private _type: AbstractType;
    private _identifierType: AbstractType;

    public constructor (amountIdentifier: string, type: AbstractType, identifierType: AbstractType = Bufy.type().uInt8Type) {
        this._amountIdentifier = amountIdentifier;
        this._type = type;
        this._identifierType = identifierType;
    }

    public calculateBufferLengthForMapping (amount: number = 1) {
        return (this._type.indexIncremental() * amount) + this._identifierType.indexIncremental();
    }

    forBuffer(view: DataView, currentIndex: number, value: any[], object?: any): void {
        let index = currentIndex;
        this._identifierType.forBuffer(view, index - this._identifierType.indexIncremental(), value.length);
        value.forEach((a: any) => {
            this._type.forBuffer(view, index, a, object);
            index += this._type.indexIncremental();
        });
    }

    forObject(view: DataView, currentIndex: number, resolved?: any): object {
        const amount = resolved[this._amountIdentifier];
        let index = currentIndex;
        const results =[];
        for (let i = 0; i < amount; i++) {
            results.push(this._type.forObject(view, index, resolved));
            index += this._type.indexIncremental();
        }

        return results;
    }

    indexIncremental(amount?: number): number {
        return this.calculateBufferLengthForMapping(amount as number);
    }
}