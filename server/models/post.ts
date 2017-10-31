import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

interface PostInterface extends mongoose.Document {
  name: string;
  title: string;
  content: string;
  slug: string;
  cuid: string;
  dateAdded: Date;
};

const postSchema = new Schema({
  name: { type: 'String', required: true },
  title: { type: 'String', required: true },
  content: { type: 'String', required: true },
  slug: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model<PostInterface>('Post', postSchema);
