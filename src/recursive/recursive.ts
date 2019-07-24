import { AbstractType } from '../types/abstractType';

export class Recursive implements AbstractType {
    private _type: AbstractType;

    public constructor (mapping: AbstractType) {
        this._type = mapping;
    }

    public calculateBufferLengthForMapping (amount: number) {
        return this._type.indexIncremental() * amount;
    }

    forBuffer(view: DataView, currentIndex: number, value: any[], object?: any): void {
        let index = currentIndex;
        value.forEach((a: any) => {
            this._type.forBuffer(view, index, a, a);
            index += this._type.indexIncremental();
        });
    }

    forObject(view: DataView, currentIndex: number, resolved?: any): object {
        let index = currentIndex;
        const results =[];

        const amount = Math.floor((view.byteLength - currentIndex) / this.calculateBufferLengthForMapping(1));
        
        for (let i = 0; i < amount; i++) {
            results.push(this._type.forObject(view, index, resolved));
            index += this._type.indexIncremental();
        }

        return results;
    }

    indexIncremental(amount: number): number {
        return this.calculateBufferLengthForMapping(amount);
    }
}