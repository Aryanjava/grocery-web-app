const ErrorHandler = require("../utils/errorhandler");

module.exports= (err, req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";


// cast error (wrong mongodb  ID error)

  if(err.name === "CastError"){
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message,400);                                      //status code 400 means bad request 
  }



    res.status(err.statusCode).json({
        success:false,
        message:err.message,
    });
};