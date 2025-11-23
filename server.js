import express from "express";
import fetch from "node-fetch"; // si Node >= 18, fetch est déjà natif
import cors from "cors";

const app = express();
app.use(cors()); // autorise ton navigateur à parler au serveur
app.use(express.json());

const GITHUB_TOKEN = "TON_GITHUB_PAT"; // ton token GitHub Actions
const WORKFLOW_URL = "https://api.github.com/repos/RyumaSamao/notion-stats/actions/workflows/update.yml/dispatches";

app.post("/trigger-workflow", async (req, res) => {
  try {
    await fetch(WORKFLOW_URL, {
      method: "POST",
      headers: {
        "Authorization": `token ${GITHUB_TOKEN}`,
        "Accept": "application/vnd.github+json",
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
