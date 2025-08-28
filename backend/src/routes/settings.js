import { Router } from "express";
import { pool } from "../db.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();

// Get all settings
router.get("/", asyncHandler(async (req, res) => {
  const result = await pool.query(`SELECT * FROM settings ORDER BY key`);
  res.json(result.rows);
}));

// Update a specific setting
router.patch("/:key", asyncHandler(async (req, res) => {
  const { key } = req.params;
  const { value } = req.body;

  if (!value) {
    return res.status(400).json({ error: "Value is required" });
  }

  const result = await pool.query(
    `UPDATE settings 
     SET value = $1, updated_at = now() 
     WHERE key = $2`,
    [value, key]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({ error: `Setting '${key}' not found` });
  }

  res.json({ message: `Setting '${key}' updated` });
}));

export default router;
