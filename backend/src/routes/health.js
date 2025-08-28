import { Router } from "express";

const router = Router();

// Simple health check
router.get("/", (req, res) => {
  res.json({ status: "ok" });
});

export default router;
