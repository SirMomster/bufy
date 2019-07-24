import { AbstractType } from "../types/abstractType";
import { BufferMapping, ObjectMapping } from "../models";

export class Nested implements AbstractType {
    private _bufferMapping: BufferMapping;
    private _keys: Array<string>;

    public constructor (bufferMapping: BufferMapping) {
        this._bufferMapping = bufferMapping;
        this._keys = Object.keys(bufferMapping);
    }

    public calculateBufferLengthForMapping () {
        let length: number = 0;

        this._keys.forEach(v => {
            const abstractType = this._bufferMapping[v] as AbstractType;
            length += abstractType.indexIncremental();
        });

        return length;
    }

    forBuffer(view: DataView, currentIndex: number, value: string | number | object | any[], object?: any): void {
        let index = currentIndex;
        this._keys.forEach(v => {
            const abstractType = this._bufferMapping[v] as AbstractType;
            abstractType.forBuffer(view, index, (value as any)[v], value);
            index += abstractType.indexIncremental();
        });
    }    
    
    forObject(view: DataView, currentIndex: number, resolved?: any): string | number | object {
        let index = currentIndex;
        const result: ObjectMapping = {}
        this._keys.forEach(v => {
            const abstractType = this._bufferMapping[v] as AbstractType;
            result[v] = abstractType.forObject(view, index, result);
            index += abstractType.indexIncremental();
        });

        return result;
    }

    indexIncremental(): number {
        return this.calculateBufferLengthForMapping();
    }

    
}