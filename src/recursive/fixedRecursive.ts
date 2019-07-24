import { AbstractType } from '../types/abstractType';
import { BufferMapping, ObjectMapping } from '../models';

export interface FixedRecursiveMapping {
    amount: number,
    mapping: BufferMapping,
}

export class FixedRecursive implements AbstractType {
    private _amountIdentifier: string;
    private _bufferMapping: BufferMapping;

    private _keys: Array<string>;

    public constructor (amountIdentifier: string, mapping: BufferMapping) {
        this._amountIdentifier = amountIdentifier;
        this._bufferMapping = mapping;
        this._keys = Object.keys(mapping);
    }

    public calculateBufferLengthForMapping (amount: number) {
        let length: number = 0;

        this._keys.forEach(v => {
            const abstractType = this._bufferMapping[v] as AbstractType;
            length += abstractType.indexIncremental();
        });

        return length * amount;
    }

    forBuffer(view: DataView, currentIndex: number, value: any[], object?: any): void {
        let index = currentIndex;
        value.forEach((a: any) => {
            this._keys.forEach(v => {
                const abstractType = this._bufferMapping[v] as AbstractType;
                abstractType.forBuffer(view, index, (a as any)[v], a);
                index += abstractType.indexIncremental();
            });
        });
    }

    forObject(view: DataView, currentIndex: number, resolved?: any): object {
        const amount = resolved[this._amountIdentifier];
        let index = currentIndex;
        const results =[];

        for (let i = 0; i < amount; i++) {
            const result: ObjectMapping = {}
            this._keys.forEach(v => {
                const abstractType = this._bufferMapping[v] as AbstractType;
                result[v] = abstractType.forObject(view, index, result);
                index += abstractType.indexIncremental();
            });
            results.push(result);
        }

        return results;
    }

    indexIncremental(amount?: number): number {
        return this.calculateBufferLengthForMapping(amount as number);
    }
}