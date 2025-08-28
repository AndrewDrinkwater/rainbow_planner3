import { Router } from "express";
import { pool } from "../db.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();

// Get active choices by category
router.get("/:category", asyncHandler(async (req, res) => {
  const { category } = req.params;

  if (!category) {
    return res.status(400).json({ error: "Category is required" });
  }

  const result = await pool.query(
    `SELECT * 
     FROM choices 
     WHERE category = $1 AND active = true 
     ORDER BY sort_order`,
    [category]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ error: `No choices found for category '${category}'` });
  }

  res.json(result.rows);
}));

export default router;
