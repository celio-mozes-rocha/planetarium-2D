import app from './app.js';

const PORT = process.env.APP_PORT || 3310;
app.listen(PORT, () => {
  console.log(`Backend Planetarium running on port ${PORT}`);
});