// server.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();                // <-- must be before app.use calls
app.use(cors({ origin: "https://https://itz-shikha-portfolio.netlify.app/.netlify.app" })); // change to your Netlify URL
app.use(express.json());              // JSON body parser

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connect error:", err));

// simple root route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// contact POST route (example — replace with your real logic)
app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    // save to DB here (use your mongoose model)
    console.log("Contact received:", req.body);
    return res.json({ success: true, message: "Message saved successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
