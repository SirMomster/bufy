import { AbstractType } from "../types";

export class NChar implements AbstractType {
    private _length: number;
    private _trim: boolean;

    public constructor (length: number, trim: boolean) {
        this._length = length;
        this._trim = trim;
    }

    static fitStringToLength(string: string, length: number) {
        const difference = length - string.length;
        if (difference < 0) {
            return string.substr(0, length);
        } else if (difference > 0) {
            for (let i = 0; i < difference; i++)
                string += ' ';
        }

        return string;
    }

    forBuffer(view: DataView, currentIndex: number, value: string): void {
        value = NChar.fitStringToLength(value, this._length);

        for (let i = 0; i < this._length; i++) {
            view.setUint8(currentIndex + i, value.charCodeAt(i));
        }
    }    

    forObject(view: DataView, currentIndex: number): string {
        const result: string[] = new Array(this._length);
        for (let i = 0; i < this._length; i++) {
            result.push(String.fromCharCode(view.getUint8(currentIndex + i)));
        }

        if (this._trim)
            return result.join('').trim();

        return result.join('');
    }
    
    indexIncremental(): number {
        return this._length;
    }
}