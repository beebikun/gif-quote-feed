import Immutable from 'immutable';


declare class Gif {
  height: number;
  src: string;
  width: number;

  constructor(data: {
    height: number;
    src: string;
    width: number;
  }): void;
}

const Gif = Immutable.Record({
  height: 200,
  src: '',
  width: 200,
});

export default Gif;