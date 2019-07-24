import { AbstractType } from './abstractType';

export class Float32Type extends AbstractType {
    forBuffer(view: DataView, currentIndex: number, value: number): void {
        return view.setFloat32(currentIndex, value);
    }

    forObject(view: DataView, currentIndex: number): number {
        return view.getFloat32(currentIndex);
    }

    indexIncremental(): number {
        return 4;
    }
}

export const float32Type = new Float32Type();