interface IFiller {
  (_: undefined, i: number): any;
}

export default function generateArray(size: number, filler: IFiller) {
  return Array.from(Array(size))
    .map(filler);
}