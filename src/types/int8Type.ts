import { AbstractType } from './abstractType';

export class Int8Type extends AbstractType {
    forBuffer(view: DataView, currentIndex: number, value: number): void {
        return view.setInt8(currentIndex, value);
    }

    forObject(view: DataView, currentIndex: number): number {
        return view.getInt8(currentIndex);
    }

    indexIncremental(): number {
        return 1;
    }
}

export const int8Type = new Int8Type();