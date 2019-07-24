import { AbstractType } from './abstractType';

export class UInt16Type extends AbstractType {
    forBuffer(view: DataView, currentIndex: number, value: number): void {
        return view.setUint16(currentIndex, value);
    }

    forObject(view: DataView, currentIndex: number): number {
        return view.getUint16(currentIndex);
    }

    indexIncremental(): number {
        return 2;
    }
}

export const uInt16Type = new UInt16Type();