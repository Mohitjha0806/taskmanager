var express = require("express");
var router = express.Router();
const User = require("../models/userModel");


/////////////////////////home////////////////////////////
router.get("/", function (req, res, next) {
  res.render("index", { title: "home" });
});

///////////////////////signin////////////////////////////
router.get("/signin", function (req, res, next) {
  res.render("signin", { title: "signin" });
});

router.post("/signin", async function (req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user === null) {
      return res.send(`User not found. <a href="/signin">Sign In</a>`);
    }
    if (user.password !== password) {
      return res.send(`Incorrect Password. <a href="/signin">Sign In</a>`);
    }
    res.redirect("/profile");
  } catch (error) {
    res.send(error);
  }
});

/////////////////////////signup////////////////////////////
router.get("/signup", function (req, res, next) {
  res.render("signup", { title: "signup" });
});

router.post("/signup", async function (req, res, next) {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.redirect("/signin");
  } catch (error) {
    res.send(error);
  }
});

/////////////////////////profile////////////////////////////
router.get("/profile", async function (req, res, next) {
  try {
    const users = await User.find();
    res.render("profile", { title: "profile", users });
  } catch (error) {
    res.send(error);
  }
});

/////////////////////////delete////////////////////////////
router.get("/delete/:id", async function (req, res, next) {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect("/profile");
  } catch (error) {
    res.send(error);
  }
});
/////////////////////////update////////////////////////////
router.get("/update/:id", async function (req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    res.render("update", { title: "update", user });
  } catch (error) {
    res.send(error);
  }
});
router.post("/update/:id", async function (req, res, next) {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/profile");
  } catch (error) {
    res.send(error);
  }
});

/////////////////////////add////////////////////////////

router.get("/add", function (req, res, next) {
  res.render("add", { title: "add" });
});

router.post("/add", async function (req, res, next) {
  try {
   const newUser = new User(req.body);
    await newUser.save();
    res.redirect("/profile");
  } catch (error) {
    res.send(error);
  }
});



module.exports = router;
