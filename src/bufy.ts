import { IBufferMapping, IObjectMapping } from "./models";
import { List } from "./recursive/list";
import { Recursive } from "./recursive/recursive";
import { NChar } from "./special/nChar";
import { Nested } from "./special/nested";
import { AbstractType, ITypes, Types } from "./types";

const DEFAULT_AMOUNT = 1;

export class Bufy<O> {

    private mapping: IBufferMapping;
    private keys: string[];

    public constructor(mapping: IBufferMapping) {
        this.mapping = mapping;
        this.keys = Object.keys(mapping);
    }

    public static type(): ITypes {
        return Types;
    }

    public static list(id: string, type: AbstractType, identifierType: AbstractType = Bufy.type().uInt8Type):
        { [Key: string]: AbstractType | List } {
        const amountId = `amount_${id}`;
        return { [amountId]: identifierType, [id]: new List(amountId, type, identifierType) };
    }

    public static recursive(type: AbstractType): Recursive {
        return new Recursive(type);
    }

    public static nChar(maxLength: number, trim: boolean = true): NChar {
        return new NChar(maxLength, trim);
    }

    public static nested(mapping: IBufferMapping): Nested {
        return new Nested(mapping);
    }

    public calculateBufferLengthForMapping(object: any): number {
        let length: number = 0;

        this.keys.forEach((v) => {
            const value = object && object[v];
            const abstractType = this.mapping[v] as AbstractType;
            length += abstractType.indexIncremental(Array.isArray(value) && value.length || DEFAULT_AMOUNT, value);
        });

        return length;
    }

    public toObject(buffer: ArrayBuffer): O {
        let index = 0;

        const result: IObjectMapping = {};
        const view = new DataView(buffer);

        this.keys.forEach((v) => {
            const abstractType = this.mapping[v] as AbstractType;
            const value = abstractType.forObject(view, index, result);
            result[v] = value;
            index += abstractType.indexIncremental(Array.isArray(value) && value.length || DEFAULT_AMOUNT);
        });

        return result as unknown as O;
    }

    public toBuffer(object: any): ArrayBuffer {
        let index = 0;
        const dataView = this.createView(object);

        this.keys.map((v) => {
            const value = object && object[v];
            const abstractType = this.mapping[v] as AbstractType;
            abstractType.forBuffer(dataView, index, value, object);
            index += abstractType.indexIncremental(Array.isArray(value) && value.length || DEFAULT_AMOUNT);
        });

        return dataView.buffer;
    }

    private createView(object: any): DataView {
        const bufferLength = this.calculateBufferLengthForMapping(object);
        const buffer = new ArrayBuffer(bufferLength);

        return new DataView(buffer);
    }
}
