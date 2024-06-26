import {createService, destroyService, destroyAllService, readOneService, readService, updateService } from "../services/carts.service.js";

async function create(req, res, next) {
  try {
    const data = req.body;
    const one = await createService(data);
    return res.json({
      statusCode: 201,
      response: one,
      message: "CREATED ID. " + one.id,
    });
  } catch (error) {
    return next(error);
  }
}
async function read(req, res, next) {
  try {
    const { user_id } = req.query;
    const all = await readService(user_id);
    if (all.length > 0) {
      return res.json({
        statusCode: 200,
        response: all,
      });
    } else {
      const error = new Error("Not found!");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}
async function readOne(req, res, next) {
  try {
    const { cid } = req.params;
    const one = await readOneService(cid);
    if (one) {
      return res.json({
        statusCode: 200,
        response: one,
        success: true,
      });
    } else {
      const error = new Error("NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}
async function update(req, res, next) {
  try {
    const { cid } = req.params;
    const data = req.body;
    const one = await updateService(cid, data);
    return res.json({
      statusCode: 200,
      message: one,
    });
  } catch (error) {
    return next(error);
  }
}
async function destroy(req, res, next) {
  try {
    const { pid } = req.params;
    const one = await destroyService(pid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
}
async function destroyAll(req, res, next) {
  try {    
    const user_id  = req.user._id;
    const all = await destroyAllService({ user_id: user_id });
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }
}

export { read, readOne, create, update, destroy, destroyAll };
