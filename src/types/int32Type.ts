import { AbstractType } from "./abstractType";

const BYTE_SIZE = 4;

export class Int32Type extends AbstractType {
    public forBuffer(view: DataView, currentIndex: number, value: number): void {
        return view.setInt32(currentIndex, value);
    }

    public forObject(view: DataView, currentIndex: number): number {
        return view.getInt32(currentIndex);
    }

    public indexIncremental(): number {
        return BYTE_SIZE;
    }
}

export const int32Type = new Int32Type();
