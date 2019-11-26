const mongoose = require("mongoose");
const validator = require("validator");
const request = require("request");

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    
    email: {
        type: String,
        required: true,
        validator: value => {
          if (!validator.isEmail(value)) {
            throw new Error({ error: "Invalid Email Address" });
          }
        }
      },
      phone: {
        type: Number,
        required: true
      },
      address: {
        type: String,
        required: true
      },
      checkin: {
        type: Date,
        default: Date.now(),
        required: true
      },
      checkout: {
        type: Date,
        default: null
      }

});

userSchema.pre("save", async function(next) {
    const user = this;
    if (user.checkout == null) {
      const host = "chauhanharsh3363334@gmail.com";
      const url = `https://us-central1-useful-song-257712.cloudfunctions.net/sendMail?dest=${host}&&name=${user.name}&&email=${user.email}&&phone=${user.phone}&&checkin=${user.checkin}&&address=${user.address}`;
      
      await request(url, function(err, res, body) {
        console.log("Checked In");
      });
    }
    next();
});

const Data = mongoose.model("Data",userSchema);
module.exports = Data;