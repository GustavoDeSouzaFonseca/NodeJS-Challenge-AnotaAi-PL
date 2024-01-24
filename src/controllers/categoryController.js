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

  static async findCategoryByTitle(req, res, next) {
    const categoryExisted = await Categories.findOne({ title: req.params.title });

    try {
      if (categoryExisted) {
        res.status(200).send(categoryExisted);
      } else {
        next(new NotFound(`${categoryExisted.title} not found`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async findCategoryById(req, res, next) {
    const { id } = req.params;
    try {
      const categoryFinded = await Categories.findById(id);
      if (categoryFinded) {
        res.status(200).send(categoryFinded);
      } else {
        next(new NotFound(`Category ${id} not found`));
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
        next(new ErrorBase(`${categoryExisted.title} already exists`, 409));
      } else {
        const category = new Categories(newCategory);
        await category.save();

        res.status(201).send(category);
      }
    } catch (err) {
      next(err);
    }
  }

  static async updateCategory(req, res, next) {
    const { id } = req.params;
    const newCategory = {
      title: req.body.title,
      description: req.body.description,
    };

    try {
      const categoryExisted = await Categories.findByIdAndUpdate(id, { $set: newCategory });

      if (!categoryExisted) {
        next(new NotFound(`Category ${id} not exist`));
      } else {
        const categoryUpdated = await Categories.findById(id);
        res.status(200).send(categoryUpdated);
      }
    } catch (err) {
      next(err);
    }
  }

  static async deleteCategory(req, res, next) {
    const { id } = req.params;

    try {
      const categoryExisted = await Categories.findByIdAndDelete(id);

      if (!categoryExisted) {
        next(new NotFound(`Category ${id} isn't exist`));
      } else {
        res.status(200).send(`Category ${id} was deleted`);
      }
    } catch (err) {
      next(err);
    }
  }
}

export default CategoryController;
