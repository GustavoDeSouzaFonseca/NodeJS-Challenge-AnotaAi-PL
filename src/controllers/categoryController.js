import ErrorBase from '../errors/errorBase.js';
import NotFound from '../errors/notFound.js';
import Categories from '../models/category.js';

class CategoryController {
  static async listAllCategories(_, res, next) {
    try {
      const allCategories = await Categories.find();

      if (allCategories.length > 0) {
        res.status(200).send(allCategories);
      } else {
        next(new NotFound('Any category registered'));
      }
    } catch (err) {
      next(err);
    }
  }

  static async createCategory(req, res, next) {
    const newCategory = {
      title: req.body.title,
      description: req.body.description,
      ownerId: req.body.ownerId,
    };

    const categoryExisted = await Categories.findOne({ title: newCategory.title });

    try {
      if (categoryExisted) {
        next(new ErrorBase(`${categoryExisted.title} already exists`));
      } else {
        const category = new Categories(newCategory);
        await category.save();

        res.status(201).send(category);
      }
    } catch (err) {
      next(err);
    }
  }
}

export default CategoryController;
