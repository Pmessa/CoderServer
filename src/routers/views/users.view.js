import { Router } from "express";
import usersManager from "../../data/fs/UsersManager.fs.js"

const usersRouter = Router();

usersRouter.get("/", async (req, res, next) => {
    try {
        const users = await usersManager.read()
        return res.render("users", { users })

    } catch (error) {
        return next(error);

    }

})
usersRouter.get("/register", async (req, res, next)=>{
    try {
        return res.render("register")
    } catch (error) {
        return next(error)
    }
})

usersRouter.get("/:uid", async (req, res, next) => {
    try {
        const { uid } = req.params
        const one = await usersManager.readOne(uid)
        return res.render("details", { user: one})
    } catch (error) {
        return res.render("details")
    }
})


export default usersRouter;