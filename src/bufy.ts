import { Types, AbstractType } from './types';
import { ObjectMapping, BufferMapping } from './models';
import { FixedRecursive } from './recursive/fixedRecursive';
import { Recursive } from './recursive/recursive';
import { NChar } from './special/nChar';
import { Nested } from './special/nested';

export class Bufy<O> {
    private _mapping: BufferMapping;
    private _keys: Array<string>;

    public constructor(mapping: BufferMapping) {
        this._mapping = mapping;
        this._keys = Object.keys(mapping);
    }

    public calculateBufferLengthForMapping (object: any) {
        let length: number = 0;

        this._keys.forEach(v => {
            const value = object && object[v];
            const abstractType = this._mapping[v] as AbstractType;
            length += abstractType.indexIncremental(Array.isArray(value) && value.length || 1);
        });

        return length;
    }

    private createView (object: any) {
        const bufferLength = this.calculateBufferLengthForMapping(object);
        const buffer = new ArrayBuffer(bufferLength);
        
        return new DataView(buffer);
    }

    public toObject(buffer: ArrayBuffer): O {
        let index = 0

        const result: ObjectMapping = {}
        const view = new DataView(buffer);

        this._keys.forEach(v => {
            const abstractType = this._mapping[v] as AbstractType;
            const value = abstractType.forObject(view, index, result);
            result[v] = value;
            index += abstractType.indexIncremental(Array.isArray(value) && value.length || 1);
        });

        return result as unknown as O;
    }

    public toBuffer(object: any): ArrayBuffer {
        let index = 0
        const dataView = this.createView(object);

        this._keys.map(v => {
            const value = object && object[v];
            const abstractType = this._mapping[v] as AbstractType;
            abstractType.forBuffer(dataView, index, value, object);
            index += abstractType.indexIncremental(Array.isArray(value) && value.length || 1);
        });

        return dataView.buffer;
    }

    static type () {
        return Types;
    }

    static fixedRecursive (id: string, type: AbstractType) {
        const amountId = `amount_${id}`;
        return { [amountId]: Bufy.type().uInt8Type, [id]: new FixedRecursive(amountId, type) };
    }

    static recursive(type: AbstractType) {
        return new Recursive(type);
    }

    static nChar(maxLength: number, trim: boolean = true) {
        return new NChar(maxLength, trim);
    }

    static nested (mapping: BufferMapping) {
        return new Nested(mapping);
    }
}