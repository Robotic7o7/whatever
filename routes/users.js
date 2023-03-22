var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");

//import models
const User = require("../models/user");
const verifyToken = require("../middleware/verify-token");

//get users
router.get("/", async function (req, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

//get user by id
router.get("/:id", async function (req, res) {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});


//get user by id
router.get("/role/:id", async function (req, res) {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({ userRole: user.userRole });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});


//new buyer
router.post("/new", async function (req, res) {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    fullName: `${req.body.firstName} ${req.body.lastName}`,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10),
    dateOfBirth: req.body.dateOfBirth,
    userRole: req.body.userRole,
    dateOfJoin: req.body.dateOfJoin
  });

  try {
    const savedUser = await user.save();
    res
      .status(200)
      .json({ message: "success", additional_info: "user created" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

//update a user password
router.patch("/:id/update_password", async function (req, res) {
  try {
    updatedUser = await User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          passKey: await bcrypt.hash(req.body.password, 10)
        }
      },
      { runValidators: true }
    );

    res
      .status(200)
      .json({ message: "success", additional_info: "password updated" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

//delete a user
router.delete("/:id/delete", async function (req, res) {
  try {
    const removedUser = await User.remove({ _id: req.params.id });
    res
      .status(200)
      .json({ message: "success", additional_info: "user deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
