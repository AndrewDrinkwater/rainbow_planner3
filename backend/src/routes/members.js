import { Router } from "express";
import { pool } from "../db.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();

// Get all members
router.get("/", asyncHandler(async (req, res) => {
  const result = await pool.query(`
    SELECT m.*, c.label as exit_reason_label
    FROM members m
    LEFT JOIN choices c ON m.exit_reason_id = c.id
    ORDER BY m.join_date DESC
  `);
  res.json(result.rows);
}));

// Exit a member
router.patch("/:id/exit", asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { exit_reason_id } = req.body;

  if (!exit_reason_id) {
    return res.status(400).json({ error: "exit_reason_id is required" });
  }

  const result = await pool.query(
    `UPDATE members 
     SET exit_date = CURRENT_DATE, exit_reason_id = $1, updated_at = now()
     WHERE id = $2`,
    [exit_reason_id, id]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({ error: "Member not found" });
  }

  res.json({ message: "Member exited" });
}));

export default router;
