const bcrypt = require("bcrypt");
const userModel = require("../models/user");
const Role = require("../models/role");
const auth = require("../helpers/auth");

module.exports.addRole = async (req, res) => {
  try {
    const { name } = req.body;

    // Create the role
    const role = new Role({ name });
    await role.save();

    res.status(201).json({ message: "Role added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.register = async (req, res) => {
  try {
    const { name, email, phone, password, roleName } = req.body;

    // Check if the role exists
    const role = await Role.findOne({ name: roleName });
    if (!role) {
      return res.status(400).json({ message: "Role not found" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = {
      name,
      email,
      phone,
      password: hashedPassword,
      role: role._id,
    };

    await userModel(user).save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const accessToken = auth.generateAccessToken({ userId: user._id, userName:user.name, userEmail:user.email });
    const refreshToken = auth.generateRefreshToken({ userId: user._id,userName:user.name, userEmail:user.email  });

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
