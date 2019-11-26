var express = require("express");
var app = express();
var userRouter = require("./Routes/routes");
var port = 3000;

require("./db/db");

app.use(express.json());
app.use(userRouter);
 
app.get("/", (req, res) => {
 res.sendFile(__dirname + "/basic.html");
});
 
app.listen(port, () => {
 console.log("Server listening on port " + port);
});




