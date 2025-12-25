import { Router } from "express";
import User from "../models/User.js";
import protect, { admin } from "../middleware/authMiddleware.js";

const router = Router();

// @route   GET /api/admin/users
// @desc    Get all users (Admin only)
// @access  Private/Admin
router.get("/", protect, admin, async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   POST /api/admin/users
// @desc    Add a new user (Admin only)
// @access  Private/Admin
router.post("/", protect, admin, async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({
      name,
      email,
      password, // must be hashed in User model
      role: role && ["admin", "customer"].includes(role) ? role : "customer",
    });

    await user.save();

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error("Create user error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route PUT /api/admin/users/:id
// @desc Update user info (admin only) - Name, email and role
// @access Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;
    }

    const updateUser = await user.save();
    res.json({ message: "User updated successfully", user: updateUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route DELETE /api/admin/users/:id
// @desc DELETE a user
// @access Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if(user){
      await user.deleteOne();
      res.json({ message: "User deleted successfully"});
    } else {
      res.status(404).json({ message: "User not found"})
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ Message: "Server Error"});
  }
})

export default router;
