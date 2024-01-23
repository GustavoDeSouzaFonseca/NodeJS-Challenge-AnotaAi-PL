import NotFound from '../errors/notFound.js';
import Categories from '../models/category.js';
import Products from '../models/product.js';

class ProductController {
  static async listAllProducts(_, res, next) {
    try {
      const allProducts = await Products.find();

      if (allProducts.length > 0) {
        res.status(200).send(allProducts);
      } else {
        next(new NotFound('Any product registered'));
      }
    } catch (err) {
      next(err);
    }
  }

  static async createProduct(req, res, next) {
    try {
      const categoryExisted = await Categories.findById(req.body.categoryId);

      if (!categoryExisted) {
        next(new NotFound(`Category ${req.body.categoryId} not found`));
        return;
      }

      const newProduct = {
        title: req.body.title,
        description: req.body.description,
        price: Number(req.body.price),
        Category: categoryExisted.toObject(),
      };

      const product = new Products(newProduct);
      await product.save();

      res.status(201).send(product);
    } catch (err) {
      next(err);
    }
  }

  static async updateProduct(req, res, next) {
    const { id } = req.params;
    try {
      const categoryExisted = await Categories.findById(req.body.categoryId);

      if (!categoryExisted) {
        next(new NotFound(`Category ${req.body.categoryId} not found`));
        return;
      }

      // without prevValue, $set update with null other values just Object Category
      const updateFields = {
        ...(req.body.title && { title: req.body.title }),
        ...(req.body.description && { description: req.body.description }),
        ...(req.body.price !== undefined && { price: Number(req.body.price) }),
        Category: categoryExisted.toObject(),
      };

      const productExisted = await Products.findByIdAndUpdate(id, { $set: updateFields });

      if (!productExisted) {
        next(new NotFound(`Product ${id} not exist`));
      } else {
        const productUpdated = await Products.findById(id);
        res.status(200).send(productUpdated);
      }
    } catch (err) {
      next(err);
    }
  }

  static async deleteProduct(req, res, next) {
    const { id } = req.params;

    try {
      const productExisted = await Products.findByIdAndDelete(id);

      if (!productExisted) {
        next(new NotFound(`Product ${id} not exist`));
      } else {
        res.status(204).send(`Product ${id} deleted`);
      }
    } catch (err) {
      next(err);
    }
  }
}

export default ProductController;
