declare module 'Types' {
  import mongoose from 'mongoose';
  export interface IGif {
    src: string;
    width: number;
    height: number;
  }

  export interface IItemRaw {
    text: string,
    gif: IGif;
  }

  type ItemModelBase = mongoose.Document & IItemRaw;

  export interface ItemModel extends ItemModelBase {
    serialize: () => IItem;
  }

  export interface IItem extends IItemRaw {
    id: string;
  }

  export type MaybeItem = ItemModel | ItemModel[] | null;
  export type MaybeError = Error | null;
}