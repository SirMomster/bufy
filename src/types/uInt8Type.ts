import { AbstractType } from './abstractType';

export class UInt8Type extends AbstractType {
    forBuffer(view: DataView, currentIndex: number, value: number): void {
        return view.setUint8(currentIndex, value);
    }

    forObject(view: DataView, currentIndex: number): number {
        return view.getUint8(currentIndex);
    }

    indexIncremental(): number {
        return 1;
    }
}

export const uInt8Type = new UInt8Type();