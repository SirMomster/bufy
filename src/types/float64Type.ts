import { AbstractType } from "./abstractType";

const BYTE_SIZE = 8;

export class Float64Type extends AbstractType {
    public forBuffer(view: DataView, currentIndex: number, value: number): void {
        return view.setFloat64(currentIndex, value);
    }

    public forObject(view: DataView, currentIndex: number): number {
        return view.getFloat64(currentIndex);
    }

    public indexIncremental(): number {
        return BYTE_SIZE;
    }
}

export const float64Type = new Float64Type();
