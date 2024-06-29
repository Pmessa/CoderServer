//import usersManager from "../dao/mongo/managers/UserManager.mongo.js";

async function isValidData(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new Error("Please enter email and password");
      error.statusCode = 400;
      throw error;
    }
    return next();
  } catch (error) {
    return next(error);
  }
}

export default isValidData;
