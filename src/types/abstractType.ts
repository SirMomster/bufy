export abstract class AbstractType {
    abstract forBuffer(view: DataView, currentIndex: number, value: number | string | object | any[], object?: any): void;
    abstract forObject(view: DataView, currentIndex: number, resolved?: any): number | string | object;

    abstract indexIncremental(amount?: number): number;
}