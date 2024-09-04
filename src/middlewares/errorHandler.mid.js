import winston from "../utils/winston.util.js";

function errorHandler(error, req, res, next) {
  const message = `${req.method} ${
    req.url
  } ${error.statusCode} - ${new Date().toLocaleTimeString()} - ${error.message}`;
  winston.ERROR(message);
/*  if (error.statusCode==404){
    return res.error404()
  }
  if (error.statusCode==500){
    return res.error500()
  }*/
  return res.json({
    statusCode: error.statusCode || 500,
    message: error.statusCode ? error.message : "CODER API ERROR",
  });
}

export default errorHandler;
