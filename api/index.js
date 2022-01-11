const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const pool = require("./db/db");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const userRoute = require("./routes/user");
const path = require("path");

app.use(cors());
dotenv.config();

// MIDDLEWARE
// app.use(function (req, res, next) {
//   res.setHeader(
//     "Access-Control-Allow-Origin",
//     "https://alausa-abdulazeez.github.io'"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );

//   next();
// });
app.use(express.json());
// app.use("Access-Control-Allow-Origin", "*")

// ROUTES
app.use("https://zstore-manager.herokuapp.com/api/auth/", authRoute);
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
