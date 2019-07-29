import { AbstractType } from "./abstractType";

const BYTE_SIZE = 1;

export class UInt8Type extends AbstractType {
    public forBuffer(view: DataView, currentIndex: number, value: number): void {
        return view.setUint8(currentIndex, value);
    }

    public forObject(view: DataView, currentIndex: number): number {
        return view.getUint8(currentIndex);
    }

    public indexIncremental(): number {
        return BYTE_SIZE;
    }
}

export const uInt8Type = new UInt8Type();
