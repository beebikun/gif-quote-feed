import mongoose from 'mongoose';
import Types from 'Types';
import { COLLECTION_NAME } from '../util/secrets';

const gifSchema = new mongoose.Schema({
  height: { type: Number, required: true },
  src: { type: String, required: true, trim: true },
  width: { type: Number, required: true },
});
const itemSchema = new mongoose.Schema({
  gif: gifSchema,
  text: { type: String, required: true, trim: true },
});

itemSchema.method('serialize', function (): Types.IItem {
  const { src, width, height }: Types.IGif = this.gif;

  return { id: this.id, gif: { src, width, height }, text: this.text };
});


export function serializeList(items: Types.ItemModel[]): Types.IItem[] {
  return items.map((item) => item.serialize());
}
export default mongoose.model<Types.ItemModel>(COLLECTION_NAME, itemSchema);
