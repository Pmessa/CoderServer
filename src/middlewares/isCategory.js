function isCategory(req, res, next) {
    try {
        const { category } = req.body
        
        if (!category) {
            req.body.category = "Without Category"
        } else {
            return next()
        }
    } catch (error) {
        return next(error)
    }
}
export default isCategory

