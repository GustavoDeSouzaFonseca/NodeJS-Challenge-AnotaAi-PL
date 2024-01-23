import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    id: { type: String },
    title: { type: String },
    description: { type: String },
    ownerId: { type: String },
  },
  {
    versionKey: false,
  },
);

const Categories = mongoose.model('category', categorySchema);

export default Categories;
