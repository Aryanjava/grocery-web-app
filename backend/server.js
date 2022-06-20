const app = require("./app");

const dotenv = require("dotenv");

const connectDatabase = require("./config/database");

//config

dotenv.config({path : "backend/config/config.env"}); 

//Connecting  to database

connectDatabase()







app.listen(process.env.PORT,() =>{                                             // creating a server and giving port no.
    console.log(`server is runing on http://localhost:${process.env.PORT}`)    // call back function
})