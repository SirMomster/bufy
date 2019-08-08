export abstract class AbstractType {
    public abstract forBuffer(view: DataView, currentIndex: number, value: number | string | object | any[] | boolean,
                              object?: any): void;
    public abstract forObject(view: DataView, currentIndex: number, resolved?: any): number | string | object | boolean;

    public abstract indexIncremental(amount?: number, object?: any): number;
}
