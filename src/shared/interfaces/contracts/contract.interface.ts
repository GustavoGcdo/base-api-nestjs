export interface IContract<T> {
    validate(model: T): boolean;
}
