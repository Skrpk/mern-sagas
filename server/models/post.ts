import * as mongoose from 'mongoose';
// tslint:disable-next-line
import { Document, Schema} from 'mongoose';

interface PostInterface extends Document {
  name: string;
  title: string;
  content: string;
  slug: string;
  cuid: string;
  dateAdded: Date;
}

const postSchema = new Schema({
  name: { type: 'String', required: true },
  title: { type: 'String', required: true },
  content: { type: 'String', required: true },
  slug: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model<PostInterface>('Post', postSchema);
