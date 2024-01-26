/* eslint-disable linebreak-style */
import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
  {
    id: { type: String },
    title: { type: String },
    description: { type: String },
    ownerId: { type: String },
    price: { type: Number },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  },
  {
    versionKey: false,
  },
);

const Products = mongoose.model('product', productSchema);

export default Products;
