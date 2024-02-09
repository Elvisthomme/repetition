import mongoose, { Document, Schema } from 'mongoose';

export interface IExample {
  name: String;
}

export interface IExampleModel extends IExample, Document {}

const exampleSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true
    }, 
    author: {
      type: Schema.Types.ObjectId, required:true, ref: 'Author'
    }
  },
  { timestamps: true }
);

export default mongoose.model<IExampleModel>('Example', exampleSchema);
