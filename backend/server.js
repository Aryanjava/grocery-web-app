const app = require("./app");


app.listen(process.env.PORT,() =>{
    console.log(`server is runing on http://localhost:${process.env.PORT}`)
})