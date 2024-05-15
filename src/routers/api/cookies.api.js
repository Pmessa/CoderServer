import { Router } from "express";

const cookiesRouter = Router();

cookiesRouter.get("/set", (req, res, next) => {
  try {
<<<<<<< HEAD
    return res
      .cookie("modo", "nocturno", { maxAge: 100000 })
      .cookie("otra", "cookie nueva", { maxAge: 60000 })
      .cookie("online", "true", { maxAge: 60 * 60 * 1000 })
      .json({ message: "la cookie vence en 10s" });
=======
    return (
      res
        //con el método cookie() seteo una cookie
        .cookie("modo", "nocturno", { maxAge: 60 * 100000 })
        .cookie("otra", "cookie nueva", { maxAge: 60 * 60000 })
        .cookie("online", "true", { maxAge: 60 * 60 * 1000 })
        .json({ message: "la cookie vence en 10s" })
    );
>>>>>>> 1b27f727f3a68a1eac345913dec84498a2d27535
  } catch (error) {
    return next(error);
  }
});

cookiesRouter.get("/", (req, res, next) => {
  try {
    const cookies = req.cookies;
    const online = req.cookies.online;
<<<<<<< HEAD
    return res.json({cookies, online });
=======
    return res.json({ cookies, online });
  } catch (error) {
    return next(error);
  }
});
cookiesRouter.get("/destroy/:cookie", (req, res, next) => {
  try {
    const { cookie } = req.params;
    return (
      res
        //con el método .clearCookie() elimino una cookie
        .clearCookie(cookie)
        .json({ message: "cookie " + cookie + " borrada" })
    );
  } catch (error) {
    return next(error);
  }
});
cookiesRouter.get("/signed", (req, res, next) => {
  try {
    return res
      .cookie("role", "admin", { signed: true })
      .json({ message: "cookie firmada con el rol de usuario" });
  } catch (error) {
    return next(error);
  }
});
cookiesRouter.get("/get-signed", (req, res, next) => {
  try {
    return res.json({ message: req.signedCookies });
>>>>>>> 1b27f727f3a68a1eac345913dec84498a2d27535
  } catch (error) {
    return next(error);
  }
});
<<<<<<< HEAD

=======
>>>>>>> 1b27f727f3a68a1eac345913dec84498a2d27535
export default cookiesRouter;
