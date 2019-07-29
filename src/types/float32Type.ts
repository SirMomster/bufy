import { AbstractType } from "./abstractType";

const BYTE_SIZE = 4;

export class Float32Type extends AbstractType {
    public forBuffer(view: DataView, currentIndex: number, value: number): void {
        return view.setFloat32(currentIndex, value);
    }

    public forObject(view: DataView, currentIndex: number): number {
        return view.getFloat32(currentIndex);
    }

    public indexIncremental(): number {
        return BYTE_SIZE;
    }
}

export const float32Type = new Float32Type();
