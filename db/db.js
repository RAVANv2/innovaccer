const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:admin@clusterreception-bvrrp.mongodb.net/test?retryWrites=true&w=majority",
{
    useNewUrlParser: true,
    useCreateIndex: true
}
);