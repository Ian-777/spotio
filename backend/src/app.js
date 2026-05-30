require("dotenv").config();

const express = require("express");
const cors = require("cors");

const citiesRoutes = require("./routes/citiesRoutes");
const localitiesRoutes = require("./routes/localitiesRoutes");
const categoriesRoutes = require("./routes/categoriesRoutes");
const neighborhoodsRoutes = require("./routes/neighborhoodsRoutes");
const storesRoutes = require("./routes/storesRoutes");
const authRoutes = require("./routes/authRoutes");
const favoritesRoutes = require("./routes/favoritesRoutes");
const ratingsRoutes = require("./routes/ratingsRoutes");
const reviewsRoutes = require("./routes/reviewsRoutes");

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   RUTAS API
========================= */

app.use("/api/cities", citiesRoutes);
app.use("/api/localities", localitiesRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/neighborhoods", neighborhoodsRoutes);
app.use("/stores", storesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/favorites", favoritesRoutes);
app.use("/api/ratings", ratingsRoutes);
app.use("/api/reviews", reviewsRoutes);

/* =========================
   RUTA PRINCIPAL
========================= */

app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

/* =========================
   EXPORTAR APP
========================= */

module.exports = app;