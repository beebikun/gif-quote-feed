/* tslint:disable:no-any */
type IFiller =  (_: undefined, i: number) => any;

/* tslint:disable:no-any */
export default function generateArray<T = any>(size: number, filler: IFiller): T[] {
  return Array.from(Array(size))
    .map(filler);
}