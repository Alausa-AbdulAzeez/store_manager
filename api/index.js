const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const pool = require("./db/db");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const userRoute = require("./routes/user");
const path = require("path");

dotenv.config();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/auth/", authRoute);
app.use("/api/products/", productRoute);
app.use("/api/users/", userRoute);

app.use(express.static(path.join(__dirname, "/client/")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/", "index.html"));
});

// const aaa = path.resolve(__dirname, "client/pages/home/home.js");
// console.log(aaa);

const PORT = 5000;
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
