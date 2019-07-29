import { AbstractType } from "./abstractType";

const BYTE_SIZE = 2;

export class Int16Type extends AbstractType {
    public forBuffer(view: DataView, currentIndex: number, value: number): void {
        return view.setInt16(currentIndex, value);
    }

    public forObject(view: DataView, currentIndex: number): number {
        return view.getInt16(currentIndex);
    }

    public indexIncremental(): number {
        return BYTE_SIZE;
    }
}

export const int16Type = new Int16Type();
