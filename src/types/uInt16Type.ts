import { AbstractType } from "./abstractType";

const BYTE_SIZE = 2;

export class UInt16Type extends AbstractType {
    public forBuffer(view: DataView, currentIndex: number, value: number): void {
        return view.setUint16(currentIndex, value);
    }

    public forObject(view: DataView, currentIndex: number): number {
        return view.getUint16(currentIndex);
    }

    public indexIncremental(): number {
        return BYTE_SIZE;
    }
}

export const uInt16Type = new UInt16Type();
