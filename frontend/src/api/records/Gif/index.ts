import * as Immutable from 'immutable';


interface IProps {
  height: number;
  src: string;
  width: number;
}

const defaultProps: Partial<IProps> = {
  height: 200,
  src: '',
  width: 200,
};

export default class Gif extends Immutable.Record(defaultProps) implements IProps {
  public readonly height!: number;
  public readonly src!: string;
  public readonly width!: number;

  public constructor(values?: Partial<IProps>) {
    super(values);
  }

  // public get(key: 'src'): string;
  // public get(key: 'height' | 'width'): number;
}