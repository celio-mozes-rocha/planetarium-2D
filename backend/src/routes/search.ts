import express from "express";
//import fetch from "node-fetch";
const router = express.Router();

router.get("/", async (req, res) => {
  const q = req.query.q as string;

  if (typeof q !== "string") {
    return res.status(400).json({ error: 'Paramètre de requête manquant "q"' });
  }

  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}`;
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Planetarium/1.0 (https://planetarium.celio-mozes.fr)",
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Échec de la récupération de data depuis Nominatim" });
  }
});

export default router;
