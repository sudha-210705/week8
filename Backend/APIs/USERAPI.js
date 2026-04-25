import exp from "express";
export const UserApp = exp.Router();
import { usermodel } from "../MODELS/USERMODEL.js";

// CREATE USER
UserApp.post('/users', async (req, res, next) => {
  try {
    console.log("REQUEST BODY:", req.body);

    const userData = {
      name: req.body.name,
      email: req.body.email,
      dateofBirth: req.body.dateofBirth,
      mobileNumber: req.body.mobileNumber ? Number(req.body.mobileNumber) : undefined
    };

    const newuserdoc = new usermodel(userData);
    await newuserdoc.save();
    res.status(201).json({ message: "user created" });
  } catch (err) {
    console.log("FULL ERROR:", err);
    next(err);
  }
});

// GET ALL USERS (only active)
UserApp.get('/users', async (req, res) => {
  let users = await usermodel.find({ status: true });
  res.status(200).json({ message: "all users", users });
});

// GET USER BY ID
UserApp.get('/users/:id', async (req, res) => {
  let user = await usermodel.findById(req.params.id);
  res.status(200).json({ message: "user found", user });
});

// UPDATE USER
UserApp.put('/users/:id', async (req, res, next) => {
  try {
    const userData = {
      name: req.body.name,
      email: req.body.email,
      dateofBirth: req.body.dateofBirth,
      mobileNumber: req.body.mobileNumber ? Number(req.body.mobileNumber) : undefined
    };

    const updatedUser = await usermodel.findByIdAndUpdate(
      req.params.id,
      { $set: userData },
      { new: true }
    );

    res.status(200).json({ message: "User updated", updatedUser });
  } catch (err) {
    next(err);
  }
});

// DELETE USER (soft delete)
UserApp.patch('/users/:id', async (req, res) => {
  console.log("DELETE ID:", req.params.id);

  let user = await usermodel.findByIdAndUpdate(
    req.params.id,
    { $set: { status: false } },
    { new: true }
  );

  console.log("UPDATED USER:", user);

  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  res.status(200).json({ message: "user removed" });
});

// ERROR HANDLER
UserApp.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.errors,
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID format",
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      message: "Email already exists",
    });
  }

  res.status(500).json({
    message: "Internal Server Error",
  });
});