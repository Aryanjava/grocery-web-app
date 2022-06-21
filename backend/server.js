const app = require("./app");

const dotenv = require("dotenv");

const connectDatabase = require("./config/database");


//Handling Uncaught exception 

process.on("uncaughtException",(err)=>{
      console.log(`Error : ${err.message}`);
      console.log(`Shutting down the server due to Uncaught exception`);
      process.exit(1);
    });

//config

dotenv.config({path : "backend/config/config.env"}); 

//Connecting  to database

connectDatabase()







const server = app.listen(process.env.PORT,() =>{                                             // creating a server and giving port no.
    console.log(`server is runing on http://localhost:${process.env.PORT}`)    // call back function
})



// unhandled Promise Rejection 

process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection  `);
 
  server.close(()=>{
    process.exit(1);
  });

});