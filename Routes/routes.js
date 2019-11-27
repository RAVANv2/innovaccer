const express = require("express");
const User = require("../model/model.js");
const router = express.Router();
const request = require("request");

router.post("/index", async (req, res, next) => {
    try {
      const user = new User(req.body);
      await user.save();
      res.send(user);
    } catch (error) {
      res.send(error);
    }
    next();
  });

router.get("/in",async (req,res,next)=>{
  res.render('in.ejs');
  next();
})

router.get("/check_out",async (req,res,next)=>{
  res.render("checkout.ejs");
  next();
})

router.get("/out",async (req,res,next)=>{
  res.render("out.ejs");
  next();
})

  router.post("/checkout", async (req, res, next) => {
    try {
      const email = req.body.email;
      let user = await User.findOne({ email });
      if (user) {
        user.checkout = Date.now();
        await user.save();
        const url = `https://us-central1-useful-song-257712.cloudfunctions.net/sendMail?dest=${host}&&name=${user.name}&&email=${user.email}&&phone=${user.phone}&&checkin=${user.checkin}&&address=${user.address}`;
        await request(url, function(err, res, body) {
          console.log("Checked Out");
        });
        res.send(user);
      } else {
        console.log("Email Address Not Found");
      }
    } catch (error) {
      console.log(error);
    }
    next();
  });


  module.exports = router;