export function errorHandler(err, req, res, next) {
  console.error("🔥 Error:", err); // log to server console

  // If it's a Postgres error, give a cleaner response
  if (err.code) {
    return res.status(400).json({
      error: "Database error",
      code: err.code,
      detail: err.detail || err.message,
    });
  }

  // Default fallback
  res.status(500).json({
    error: "Internal server error",
    message: err.message,
  });
}
