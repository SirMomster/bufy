import { AbstractType } from './abstractType';

export class Float64Type extends AbstractType {
    forBuffer(view: DataView, currentIndex: number, value: number): void {
        return view.setFloat64(currentIndex, value);
    }

    forObject(view: DataView, currentIndex: number): number {
        return view.getFloat64(currentIndex);
    }

    indexIncremental(): number {
        return 8;
    }
}

export const float64Type = new Float64Type();