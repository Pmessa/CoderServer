function isPhoto(req, res, next) {
  try {
    if (req.file) {
      req.body.photo = "/assets/" + req.file.filename;
    } else {
      req.body.photo =
        "https://www.grandespymes.com.ar/wp-content/uploads/2020/10/nuevo-producto-830x518.jpg";
    }
    return next();
  } catch (error) {
    return next(error);
  }
}
export default isPhoto;
