class ErrorHandler extends Error{                                                 // inherting node default error class 
        constructor(message,statusCode){
            super(message);
            this.statusCode = statusCode

            Error.captureStackTrace(this,this.constructor);
        }

}      

module.exports = ErrorHandler