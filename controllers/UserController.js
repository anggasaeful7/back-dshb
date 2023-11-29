import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: {
        exclude: ["password", "refresh_token"],
      },
    });
    res.json({
      status: "success",
      message: "Users successfully loaded",
      data: users,
    });
  } catch (error) {
    console.log(error);
  }
};

export const Register = async (req, res) => {
  const { name, email, password, confPassword } = req.body;
  if (password !== confPassword) {
    res.status(400).json({
      message: "Password not match",
    });
  }

  //   Cek apakah email sudah terdaftar
  const emailExist = await Users.findOne({
    where: {
      email: email,
    },
  });
  if (emailExist) {
    res.status(400).json({
      message: "Email already registered",
    });
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    await Users.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      message: "User successfully created",
      data: {
        name,
        email,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      res.status(400).json({
        message: "Email not found",
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(400).json({
        message: "Password not match",
      });
    }

    const accessToken = jwt.sign(
      {
        userId: user.id,
        name: user.name,
        email: user.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "20s" }
    );

    const refreshToken = jwt.sign(
      {
        userId: user.id,
        name: user.name,
        email: user.email,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    await Users.update(
      {
        refresh_token: refreshToken,
      },
      {
        where: {
          id: user.id,
        },
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ accessToken: accessToken });
  } catch (error) {}
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await Users.findOne({
    where: {
      refresh_token: refreshToken,
    },
  });

  if (!user) return res.sendStatus(403);
  await Users.update(
    {
      refresh_token: null,
    },
    {
      where: {
        id: user.id,
      },
    }
  );

  res.clearCookie("refreshToken");
  res.sendStatus(200);
};
