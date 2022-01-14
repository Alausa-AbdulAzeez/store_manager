const router = require("express").Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { verifyTokenAndIsAdmin } = require("./verifyTokekn");
const pool = require("../db/db");

// REGISTER

router.post("/signup", async (req, res) => {
  try {
    const { email } = req.body;
    const password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SEC_KEY
    ).toString();
    if (email && password !== "") {
      const newPersonnel = await pool.query(
        `INSERT INTO personnel (email, password) VALUES($1,$2) RETURNING *`,
        [email, password]
      );
      res.status(201).json(newPersonnel.rows[0]);
    } else res.status(403).json("Please input credentials");
  } catch (error) {
    res.status(500).json(error);
  }
});

// LOGIN

router.post("/login", async (req, res) => {
  await pool.connect();
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await pool.query(
        `SELECT * FROM personnel WHERE email = $1`,
        [email]
      );

      console.log(user);

      // check user validity
      user.rows.length === 0 && res.status(403).json("User not found!");

      // decrypt password
      // const decryptedPassword = CryptoJS.AES.decrypt(
      //   user.rows[0].password,
      //   process.env.SEC_KEY
      // ).toString(CryptoJS.enc.Utf8);

      const decryptedPassword = user.rows[0].password;

      // Checks password validity
      decryptedPassword !== req.body.password &&
        res.status(403).json("Iinvalid username or password");

      const accessToken = jwt.sign(
        {
          isAttendant: user.rows[0].isattendant,
          isAdmin: user.rows[0].isadmin,
        },
        process.env.JWT_SEC,
        { expiresIn: "100d" }
      );

      const { password, ...others } = user.rows[0];
      res.status(201).json({ ...others, accessToken });
    } else {
      res.status(403).json("Please input credentials");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
