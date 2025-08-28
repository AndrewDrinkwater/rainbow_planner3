import { Router } from "express";
import { pool } from "../db.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();

// Get all enquiries
router.get("/", asyncHandler(async (req, res) => {
  const result = await pool.query(`
    SELECT e.*, c.label as status_label
    FROM enquiries e
    LEFT JOIN choices c ON e.status_id = c.id
    ORDER BY e.created_at DESC
  `);
  res.json(result.rows);
}));

// Add enquiry
router.post("/", asyncHandler(async (req, res) => {
  const { name, dob, status_id } = req.body;
  if (!name || !dob) {
    return res.status(400).json({ error: "Name and DOB are required" });
  }

  const result = await pool.query(
    `INSERT INTO enquiries (name, dob, status_id)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [name, dob, status_id]
  );
  res.json(result.rows[0]);
}));

// Update enquiry status
router.patch("/:id/status", asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status_id } = req.body;

  const result = await pool.query(
    `UPDATE enquiries SET status_id = $1 WHERE id = $2`,
    [status_id, id]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({ error: "Enquiry not found" });
  }

  res.json({ message: "Status updated" });
}));

// Promote enquiry to member
router.post("/:id/promote", asyncHandler(async (req, res) => {
  const { id } = req.params;

  const enquiry = await pool.query(`SELECT * FROM enquiries WHERE id = $1`, [id]);
  if (enquiry.rows.length === 0) return res.status(404).json({ error: "Enquiry not found" });

  const e = enquiry.rows[0];
  const member = await pool.query(
    `INSERT INTO members (enquiry_id, name, dob, join_date)
     VALUES ($1, $2, $3, CURRENT_DATE)
     RETURNING *`,
    [e.id, e.name, e.dob]
  );

  await pool.query(
    `UPDATE enquiries SET status_id = (
      SELECT id FROM choices WHERE category = 'enquiry_status' AND value = 'promoted'
    ) WHERE id = $1`,
    [id]
  );

  res.json(member.rows[0]);
}));

export default router;
