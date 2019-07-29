import { AbstractType } from "../types";

export class NChar implements AbstractType {

    private length: number;
    private trim: boolean;

    public constructor(length: number, trim: boolean) {
        this.length = length;
        this.trim = trim;
    }

    public static fitStringToLength(value: string, length: number): string {
        const difference = length - value.length;
        let newValue = value;

        if (difference < 0) {
            newValue = value.substr(0, length);
        } else if (difference > 0) {
            for (let i = 0; i < difference; i++) {
                newValue += " ";
            }
        }

        return newValue;
    }

    public forBuffer(view: DataView, currentIndex: number, value: string): void {
        const newValue: string = NChar.fitStringToLength(value, this.length);

        for (let i = 0; i < this.length; i++) {
            view.setUint8(currentIndex + i, newValue.charCodeAt(i));
        }
    }

    public forObject(view: DataView, currentIndex: number): string {
        const result: string[] = new Array(this.length);
        for (let i = 0; i < this.length; i++) {
            result.push(String.fromCharCode(view.getUint8(currentIndex + i)));
        }

        if (this.trim) {
            return result.join("").trim();
        }

        return result.join("");
    }

    public indexIncremental(): number {
        return this.length;
    }
}
