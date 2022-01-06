const router = require("express").Router();
const pool = require("../db/db");
const {
  verifyTokenAndIsAdmin,
  verifyTokenAndAuthorization,
} = require("./verifyTokekn");

// get user
router.get("/", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const users = await pool.query(`SELECT * FROM personnel`);
    res
      .status(201)
      .json(users.rows.sort((a, b) => b.updated_at - a.updated_at));
  } catch (error) {
    console.log(error);
  }
});

// update user

router.put("/update/:id", verifyTokenAndIsAdmin, async (req, res) => {
  try {
    const { isAdmin } = req.body;
    const { id } = req.params;
    const updatedUser = await pool.query(
      `UPDATE personnel SET isAdmin = $1  WHERE personnel_id = $2 RETURNING *`,
      [isAdmin, id]
    );
    res.status(201).json(updatedUser);
  } catch (error) {
    res.json(error);
  }
});

// update user items_sold

router.put("/items_sold/:id", verifyTokenAndAuthorization, async (req, res) => {
  const number = 1;
  try {
    const { id } = req.params;
    const product = await pool.query(
      `UPDATE personnel SET total_items_sold = (SELECT total_items_sold from personnel where personnel_id = $2)+$1 WHERE personnel_id = $2 RETURNING *`,
      [number, id]
    ).then;
    res.status(201).json(product.rows);
  } catch (error) {
    res.json(error);
  }
});

// NEW SALE
router.post(
  "/items_sold/:id",
  verifyTokenAndAuthorization,
  async (req, res) => {
    const number = 1;
    try {
      const { id } = req.params;
      const product = await pool.query(
        `INSERT INTO sales (amount,personnel_id) VALUES($1,$2) RETURNING *`,
        [number, id]
      );
      res.status(201).json(product.rows);
    } catch (error) {
      res.json(error);
    }
  }
);

// GET USER STATS
router.get("/stats/:id", verifyTokenAndIsAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const stats = await pool.query(
      `SELECT SUM(amount) as total,TO_CHAR(order_date, 'month') FROM sales WHERE TO_CHAR(order_date, 'month') =TO_CHAR(order_date, 'month') AND personnel_id = $1 GROUP BY TO_CHAR(order_date, 'month')`,
      [id]
    );
    res.status(201).json(stats.rows);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
