import {
  createService,
  destroyService,
  paginateService,
  readOneService,
  readService,
  updateService,
} from "../services/products.service.js";

class ProductController {
  async read(req, res, next) {
    try {
      const { category } = req.query;
      let all;
      if (category) {
        all = await readService({ category });
      } else {
        all = await readService();
      }
      if (all.length > 0) {
        return res.response200(all);
      } else {
        const error = new Error("Not found!");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      return next(error);
    }
  }
  async paginate(req, res, next) {
    try {
      const filter = {};
      const opts = { sort: "title"};

      if (req.query.limit) {
        opts.limit = req.query.limit;
      }
      if (req.query.page) {
        opts.page = req.query.page;
      }
      if (req.query.user_id) {
        filter.user_id = req.query.user_id;
      }
      if (req.query.category) {
        filter.category = req.query.category;
      }
      const all = await paginateService({ filter, opts });
      
      const finalPages = [];

      for (let i = 0; i < all.totalPages; i += 1) {
        finalPages.push(i + 1);
      }
      const info = {
        totalDocs: all.totalDOcs,
        page: all.page,
        totalPages: all.totalPages,
        totalPage: finalPages,
        limit: all.limit,
        prevPage: all.prevPage,
        nextPage: all.nextPage,
      };
      return res.paginate(all.docs, info);
    } catch (error) {
      return next(error);
    }
  }
  async readOne(req, res, next) {
    try {
      const { pid } = req.params;
      const one = await readOneService(pid);
      if (one) {
        return res.response200(one);
      } else {
        const error = new Error("NOT FOUND");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      return next(error);
    }
  }
  async create(req, res, next) {
    try {
      const data = req.body;
      const one = await createService(data);
      return res.response200("CREATED ID. " + one.id);
    } catch (error) {
      return next(error);
    }
  }
  async update(req, res, next) {
    try {
      const { pid } = req.params;
      const data = req.body;
      const one = await updateService(pid, data);
      return res.response200(one);
    } catch (error) {
      return next(error);
    }
  }
  async destroy(req, res, next) {
    try {
      const { pid } = req.params;
      const one = await destroyService(pid);
      return res.response200(one);
    } catch (error) {
      return next(error);
    }
  }
}

const productController = new ProductController();

export const { read, paginate, readOne, create, update, destroy } =
  productController;
