import { Router } from "express";
//import productsManager from "../../dao/fs/ProductsManager.fs.js";
//import productsManager from "../../dao/mongo/managers/ProductsManager.mongo.js";
import usersRouter from "./users.view.js";
import productsRouter from "./products.view.js";
import cartsRouter from "./carts.view.js";
import { paginate } from "mongoose-paginate-v2";

//import productDetailRouter from "./product.detail.view.js";

const viewsRouter = Router();

viewsRouter.use("/carts", cartsRouter)
viewsRouter.use("/users", usersRouter);
viewsRouter.use("/products/real", productsRouter);
viewsRouter.use("/:pid", productsRouter)

/* viewsRouter.get("/", (req, res, next)=>{
    try {
        return res.render("index", { title: "HOME"})
        
    } catch (error) {
        return next(error);
        
    }
}) */
viewsRouter.get("/", async (req, res, next) => {
  try {
    const page = 1
    const limit = 10

    const response = await fetch(`http://localhost:8080/api/products/paginate?limit=${limit}&page=${page}`);
    let user_id = null
    if (req.cookies.token){
    const userOnline = await fetch('http://localhost:8080/api/sessions/online',
    {
      method: 'GET', 
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `token=${req.cookies.token}`
            }}
    )
    const fetchedUser = await userOnline.json()
    //user_id = fetchedUser.response._id
  }
    //console.log(req.cookies);
   /*  let newLogin = true
    if (req.session.firstTimeLogin) {
      newLogin = false
    }
    if (req.session.user_id) {
      req.session.firstTimeLogin = true
    }
 */
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const fetchedDocs = await response.json();
    //console.log(fetchedDocs);

    if (response.ok && req.cookies.token) {      
      return res.render("index", { products: fetchedDocs.response, pagination: fetchedDocs.info.totalPage, limit: fetchedDocs.info.limit, nextPage: fetchedDocs.info.nextPage, prevPage: fetchedDocs.info.prevPage, url: 'products/',  /*newLogin: newLogin,*/ user_id: user_id });
    }
    else {
      return res.render("index", { products: fetchedDocs.response, pagination: fetchedDocs.info.totalPage, limit: fetchedDocs.info.limit, nextPage: fetchedDocs.info.nextPage, prevPage: fetchedDocs.info.prevPage, url: 'products/' });
    }

  } catch (error) {
    return next(error);
  }
})


export default viewsRouter;