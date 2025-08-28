import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { errorHandler } from "./middleware/errorHandler.js";
import enquiriesRoutes from "./routes/enquiries.js";
import membersRoutes from "./routes/members.js";
import choicesRoutes from "./routes/choices.js";
import settingsRoutes from "./routes/settings.js";
import healthRoutes from "./routes/health.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Mount routers
app.use("/api/enquiries", enquiriesRoutes);
app.use("/api/members", membersRoutes);
app.use("/api/choices", choicesRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/health", healthRoutes);

// Error handler middleware (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`API listening on http://localhost:${PORT}`)
);
