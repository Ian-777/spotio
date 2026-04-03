const express = require("express");
const router = express.Router();
const citiesController = require("../controllers/citiesController");

// GET /cities
router.get("/", citiesController.getCities);

module.exports = router;