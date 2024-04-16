function isTitle(req, res, next) {
    try {
        const { title } = req.body
        
        if (!title) {
            const err = new Error("YOU MUST ENTER THE PRODUCT TITLE");
            err.statusCode = 400
            throw err;
        }else{
            return next()
        }
    } catch (error) {
        return next(error)
    }
}
export default isTitle