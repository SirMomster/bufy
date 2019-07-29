import { AbstractType } from "./abstractType";

const BYTE_SIZE = 1;

export class Int8Type extends AbstractType {
    public forBuffer(view: DataView, currentIndex: number, value: number): void {
        return view.setInt8(currentIndex, value);
    }

    public forObject(view: DataView, currentIndex: number): number {
        return view.getInt8(currentIndex);
    }

    public indexIncremental(): number {
        return BYTE_SIZE;
    }
}

export const int8Type = new Int8Type();
