import app from "./app";

const PORT = process.env.APP_PORT || 3310;
app.listen(PORT, () => {
  console.log(`Backend Planetarium running on port ${PORT}`);
});
