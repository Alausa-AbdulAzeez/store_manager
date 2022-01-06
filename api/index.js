const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const pool = require("./db/db");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const userRoute = require("./routes/user");

dotenv.config();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/auth/", authRoute);
app.use("/api/products/", productRoute);
app.use("/api/users/", userRoute);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
