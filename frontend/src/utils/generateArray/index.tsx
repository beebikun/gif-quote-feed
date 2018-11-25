type IFiller<T> = (_: undefined, i: number) => T;

/* tslint:disable-next-line:no-any */
export default function generateArray<T = any>(size: number, filler: IFiller<T>): T[] {
  return Array.from(Array(size))
    .map(filler);
}