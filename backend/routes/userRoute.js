const express = require("express");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const Role = require("../models/Roles");
const expressAsyncHandler = require("express-async-handler");

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find();

  return res.send(users);
});

router.post("/signin", async (req, res) => {
  const signinUser = await User.findOne({ email: req.body.email }).populate(
    "roles"
  );

  if (!signinUser) return res.status(400).json({ message: "User not found" });

  const matchPassword = await User.comparePassword(
    req.body.password,
    signinUser.password
  );

  if (!matchPassword)
    return res.status(401).json({ token: null, message: "Invalid password" });

  const token = jwt.sign({ id: signinUser._id }, process.env.JWT_SECRET, {
    expiresIn: 86400,
  });

  res.json({
    token,
    _id: signinUser.id,
    name: signinUser.name,
    email: signinUser.email,
    roles: signinUser.roles,
  });
});

router.post("/register", async (req, res) => {
  try {
    const { userName, name, lastName, email, phone, codigo, password } =
      req.body;
    console.log(req.body);
    const user = new User({
      userName,
      name,
      lastName,
      email,
      phone,
      codigo,
      password: await User.encryptPassword(password),
    });

    const newUser = await user.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: 86400,
    });

    res.status(200).json({
      token,
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      roles: newUser.roles,
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "Usuario no encontrado" });
    }
  })
);

router.get(
  "/afiliado/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const users = await User.find(
        { codigo: req.params.id },
        { password: 0, createdAt: 0, updatedAt: 0 }
      );

      const user = {
        _id: users.id,
        userName: users.userName,
        name: users.name,
        lastName: users.lastName,
        email: users.email,
        codigo: users.codigo,
      };

      console.log(users);
      res.send(users);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  })
);

router.get("/createadmin", async (req, res) => {
  try {
    const user = new User({
      name: "Ariel",
      email: "dj-plomo@hotmail.com",
      password: "1234",
      isAdmin: true,
    });
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

module.exports = router;
