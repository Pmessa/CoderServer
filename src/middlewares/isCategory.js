function isCategory(req, res, next) {
  try {
    let { category } = req.body;
    //console.log(category);

    if (!category) {
      category = "without category";
    } else {
      return next();
    }
  } catch (error) {
    return next(error);
  }
}
export default isCategory;
