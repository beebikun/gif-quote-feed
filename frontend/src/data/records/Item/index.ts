import * as Immutable from 'immutable';
import Gif from '../Gif';
import { FakeID } from 'utils';

export interface IProps {
  gif: Gif;
  id: string;
  text: string;
}

const defaultProps: IProps = {
  gif: new Gif(),
  id: '',
  text: '',
};


export default class Item extends Immutable.Record(defaultProps) implements IProps {
  public readonly gif!: Gif;
  public readonly id!: string;
  public readonly text!: string;
  public toObject: () => IProps;

  public constructor(values: Partial<IProps>) {
    if (values.id === undefined) {
      values.id = FakeID.next();
    }

    super(values);
  }

  public getId(): string | undefined {
    if (FakeID.is(this.id)) {
      return undefined;
    } else {
      return this.id;
    }
  }

  public resetId(): Item {
    return this.set('id', FakeID.next());
  }

  public data(): Partial<IProps> {
    const { id, ...data } = this.toObject() as IProps;

    return data;
  }
}
