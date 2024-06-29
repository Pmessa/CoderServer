import { Router } from "express";
import { Types } from "mongoose";
import cartsManager from "../../dao/mongo/managers/CartsManager.mongo.js";

const ticketsRouter = Router();

ticketsRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const ticket = await cartsManager.aggregate([
      {
        $match: {
          user_id: new Types.ObjectId(uid),
        },
      },
      {
        $lookup: {
          foreignField: "_id",
          from: "products",
          localField: "product_id",
          as: "product_id",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ["$product_id", 0] }, "$$ROOT"],
          },
        },
      },
      {
        $set: {
          subTotal: { $multiply: ["$quantity", "$price"] },
        },
      },
      { $group: { _id: "user_id", total: { $sum: "$subTotal" } } },
      {
        $project: { _id: 0, user_id: uid, total: "$total", date: new Date() },
      },
    //   { $merge: { into: "tickets" } },
    ]);
    return res.json({
      statusCode: 200,
      response: ticket,
    });
  } catch (error) {
    return next(error);
  }
});

export default ticketsRouter;
