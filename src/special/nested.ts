import { IBufferMapping, IObjectMapping } from "../models";
import { AbstractType } from "../types/abstractType";

export class Nested implements AbstractType {
    private bufferMapping: IBufferMapping;
    private keys: string[];

    public constructor(bufferMapping: IBufferMapping) {
        this.bufferMapping = bufferMapping;
        this.keys = Object.keys(bufferMapping);
    }

    public forBuffer(view: DataView, currentIndex: number, value: string | number | object | any[],
                     object?: any): void {
        let index = currentIndex;
        this.keys.forEach((v: string) => {
            const abstractType = this.bufferMapping[v] as AbstractType;
            abstractType.forBuffer(view, index, (value as any)[v], value);
            index += abstractType.indexIncremental();
        });
    }

    public forObject(view: DataView, currentIndex: number, resolved?: any): string | number | object {
        let index = currentIndex;
        const result: IObjectMapping = {};
        this.keys.forEach((v: string) => {
            const abstractType = this.bufferMapping[v] as AbstractType;
            result[v] = abstractType.forObject(view, index, result);
            index += abstractType.indexIncremental();
        });

        return result;
    }

    public indexIncremental(): number {
        let length: number = 0;

        this.keys.forEach((v: string) => {
            const abstractType = this.bufferMapping[v] as AbstractType;
            length += abstractType.indexIncremental();
        });

        return length;
    }

    public getKeys(): string[] {
        return this.keys;
    }

    public getBufferMapping(): IBufferMapping {
        return this.bufferMapping;
    }
}
