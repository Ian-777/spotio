const express = require("express");
const router = express.Router();
const localitiesController = require("../controllers/localitiesController");

// GET /localities/:city_id
router.get("/:city_id", localitiesController.getLocalities);

module.exports = router;