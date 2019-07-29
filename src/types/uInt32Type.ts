import { AbstractType } from "./abstractType";

const BYTE_SIZE = 4;

export class UInt32Type extends AbstractType {
    public forBuffer(view: DataView, currentIndex: number, value: number): void {
        return view.setUint32(currentIndex, value);
    }

    public forObject(view: DataView, currentIndex: number): number {
        return view.getUint32(currentIndex);
    }

    public indexIncremental(): number {
        return BYTE_SIZE;
    }
}

export const uInt32Type = new UInt32Type();
