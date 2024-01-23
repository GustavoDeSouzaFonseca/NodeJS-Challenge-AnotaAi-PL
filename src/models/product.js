/* eslint-disable linebreak-style */
import mongoose from 'mongoose';
import category from './category.js';

const productSchema = mongoose.Schema(
  {
    id: { type: String },
    title: { type: String },
    description: { type: String },
    ownerId: { type: String },
    Category: category,
  },
  {
    versionKey: false,
  },
);

const Products = mongoose.model('product', productSchema);

export default Products;
