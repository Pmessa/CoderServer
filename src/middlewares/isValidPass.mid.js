import usersManager from "../data/mongo/managers/UserManager.mongo.js";

async function isValidPass(req, res, next) {
  try {
    const { email, password } = req.body;
    const one = await usersManager.readByEmail(email);
    if (one.password === password) {
      return next();
    }
    const error = new Error("Invalid Credentials");
    error.statusCode = 401;
    throw error
  } catch (error) {
    return next(error);
  }
}
export default isValidPass
