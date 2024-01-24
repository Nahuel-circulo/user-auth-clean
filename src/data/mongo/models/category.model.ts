import mongoose, { Schema } from 'mongoose';

const categorySchema = new mongoose.Schema({

  name: {
    type: String,
    required: [true, 'Name is required']
  },
  available: {
    type: Boolean,
    default: false
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true,'User id is required']
  }

})

export const CategoryModel = mongoose.model('Category', categorySchema);