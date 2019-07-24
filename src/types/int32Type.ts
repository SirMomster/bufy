import { AbstractType } from './abstractType';

export class Int32Type extends AbstractType {
    forBuffer(view: DataView, currentIndex: number, value: number): void {
        return view.setInt32(currentIndex, value);
    }

    forObject(view: DataView, currentIndex: number): number {
        return view.getInt32(currentIndex);
    }

    indexIncremental(): number {
        return 4;
    }
}

export const int32Type = new Int32Type();