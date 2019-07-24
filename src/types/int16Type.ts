import { AbstractType } from './abstractType';

export class Int16Type extends AbstractType {
    forBuffer(view: DataView, currentIndex: number, value: number): void {
        return view.setInt16(currentIndex, value);
    }

    forObject(view: DataView, currentIndex: number): number {
        return view.getInt16(currentIndex);
    }

    indexIncremental(): number {
        return 2;
    }
}

export const int16Type = new Int16Type();