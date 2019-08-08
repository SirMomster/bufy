import { AbstractType } from "../types/abstractType";

const BYTE_SIZE = 1;
const TRUE = 1;
const FALSE = 0;

export class Bool implements AbstractType {
    public forBuffer(view: DataView, currentIndex: number, value: string | number | object | any[] | boolean,
                     object?: any): void {
        view.setUint8(currentIndex, (value) ? TRUE : FALSE);
    }

    public forObject(view: DataView, currentIndex: number, resolved?: any): string | number | object | boolean {
        return (view.getUint8(currentIndex) === TRUE) ? true : false;
    }

    public indexIncremental(amount?: number | undefined, object?: any): number {
        return BYTE_SIZE;
    }
}


export const bool = new Bool();
