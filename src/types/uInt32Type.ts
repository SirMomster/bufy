import { AbstractType } from './abstractType';

export class UInt32Type extends AbstractType {
    forBuffer(view: DataView, currentIndex: number, value: number): void {
        return view.setUint32(currentIndex, value);
    }

    forObject(view: DataView, currentIndex: number): number {
        return view.getUint32(currentIndex);
    }

    indexIncremental(): number {
        return 4;
    }
}

export const uInt32Type = new UInt32Type();