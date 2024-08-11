const router = require("express").Router();
const { User } = require("../db/models");
const bcrypt = require("bcrypt");
const generateTokens = require("../utils/generateTokens");
const jwtConfig = require("../config/jwtConfig");
const cookiesConfig = require("../config/cookiesConfig");



router.post("/registration", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
      return res.status(400).json({ message: "Пустые поля" });
    }

    const userInDb = await User.findOne({ where: { email } });
    if (userInDb) {
      return res.status(400).json({ message: "Пользователь уже существует" });
    } else {
      const user = (
        await User.create({
          name,
          email,
          password: await bcrypt.hash(password, 10),
        })
      ).get();

      const { accessToken, refreshToken } = generateTokens({ user });
      delete user.password;

      res
        .status(201)
        .cookie(jwtConfig.refresh.type, refreshToken, cookiesConfig)
        .json({ accessToken, user });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.post("/authorization", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email.trim() === "" || password.trim() === "") {
      return res.status(400).json({ message: "Пустые поля" });
    }

    const user = (await User.findOne({ where: { email } })).get();
    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      const { accessToken, refreshToken } = generateTokens({ user });

      delete user.password;
      res
        .cookie(jwtConfig.refresh.type, refreshToken, cookiesConfig)
        .json({ accessToken, user });
    } else {
      return res.status(400).json({ message: "Не верный email или пароль" });
    }
  } catch (error) {
    res.status(500).json({ message: "Не верный email или пароль" });
  }
});

router.delete("/logout", (req, res) => {
  res.clearCookie(jwtConfig.refresh.type).json({ accessToken: "" });
});

module.exports = router;
