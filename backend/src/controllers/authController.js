const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const usersModel = require("../models/usersModel");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await usersModel.findUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({
        message: "El correo ya está registrado",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await usersModel.createUser(
      name,
      email,
      hashedPassword
    );

    const token = jwt.sign(
      {
        user_id: user.user_id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({
      token,
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al registrar usuario",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await usersModel.findUserByEmail(email);

    if (!user) {
      return res.status(400).json({
        message: "Correo o contraseña incorrectos",
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {
      return res.status(400).json({
        message: "Correo o contraseña incorrectos",
      });
    }

    const token = jwt.sign(
      {
        user_id: user.user_id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      token,
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al iniciar sesión",
    });
  }
};

module.exports = {
  register,
  login,
};