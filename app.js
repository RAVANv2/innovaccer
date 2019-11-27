var express = require("express");
var app = express();
var userRouter = require("./Routes/routes");
var port = 3000;

require("./db/db");

app.use(express.json());
app.use(userRouter);
 
app.set("views", __dirname + "/views");
app.set("view engine", "ejs"); 

app.get("/",async (req,res,next)=>{
res.render('basic.ejs');
next();
});
 
app.listen(port, () => {
 console.log("Server listening on port " + port);
});




