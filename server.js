// server.js
import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Remplace par ton token GitHub ici
const GITHUB_TOKEN = "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";
const WORKFLOW_URL = "https://api.github.com/repos/RyumaSamao/notion-stats/actions/workflows/update.yml/dispatches";

app.post("/trigger-workflow", async (req, res) => {
  try {
    await fetch(WORKFLOW_URL, {
      method: "POST",
      headers: {
        "Authorization": `token ${GITHUB_TOKEN}`,
        "Accept": "application/vnd.github+json"
      },
      body: JSON.stringify({ ref: "main" })
    });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
