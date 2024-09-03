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
      if (req.user && req.user.role == 2) {
        const user_id = req.user._id;
        const isMe = req.path == "/me" ? user_id : { $ne: user_id };
        const filter = { supplier_id: isMe };
        //console.log(filter);
        all = await readService(filter);
      } else if (req.user && req.user.role == 2 && category) {
        const user_id = req.user._id;
        const isMe = req.path == "/me" ? { $ne: user_id } : user_id;
        const filter = { supplier_id: isMe };
        all = await readService(filter);
      } else {
        all = await readService();
      }
      if (all.length > 0) {
        return res.response200(all);
      } else {
        return res.error404();
      }
    } catch (error) {
      return next(error);
    }
  }
  async paginate(req, res, next) {
    try {
      const filter = {};
      const opts = { sort: "title" };

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
      if (req.query.supplier) {
        if (req.path == "/paginate") {
          filter.supplier_id = { $ne: req.query.supplier };
        } else if (req.path == "/me") {
          filter.supplier_id = { $eq: req.query.supplier };
        }
      }
      //console.log(req.query)
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

      //compruebo y sino devuelvo el error correspondiente
      if (all) {
        return res.paginate(all.docs, info);
      } else {
        return res.error404()
      }
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
        return res.error400("ID de producto no encontrado")
      }
    } catch (error) {
        return next(error);
    }
  }
  async create(req, res, next) {
    try {
      const data = req.body;
      data.supplier_id = req.user._id
      const one = await createService(data);
      if (one) {
        return res.message201("CREATED ID: " + one._id);
      } else {
        return res.error400()
      }
    } catch (error) {
      console.log(error)
      return next(error);
    }
  }
  async update(req, res, next) {
    try {
      const { pid } = req.params;
      const data = req.body;
      const one = await updateService(pid, data);
      if (one) {
        return res.response200(one);
      } else {
        return res.error400()
      }
    } catch (error) {
      return next(error);
    }
  }
  async destroy(req, res, next) {
    try {
      const { pid } = req.params;
      const one = await destroyService(pid);
      if (one) {
        return res.response200(one);
      } else {
        return res.error400()
      }
    } catch (error) {
      return next(error);
    }
  }
}

const productController = new ProductController();

export const { read, paginate, readOne, create, update, destroy } =
  productController;
