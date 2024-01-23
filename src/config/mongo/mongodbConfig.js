import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/product-catalog');

const db = mongoose.connection;

export default db;
