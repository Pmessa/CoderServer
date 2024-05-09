import { Router } from "express";

const cookiesRouter = Router();

cookiesRouter.get("/set", (req, res, next) => {
  try {
    return res
      .cookie("modo", "nocturno", { maxAge: 100000 })
      .cookie("otra", "cookie nueva", { maxAge: 60000 })
      .cookie("online", "true", { maxAge: 60 * 60 * 1000 })
      .json({ message: "la cookie vence en 10s" });
  } catch (error) {
    return next(error);
  }
});

cookiesRouter.get("/", (req, res, next) => {
  try {
    const cookies = req.cookies;
    const online = req.cookies.online;
    return res.json({cookies, online });
  } catch (error) {
    return next(error);
  }
});

export default cookiesRouter;
