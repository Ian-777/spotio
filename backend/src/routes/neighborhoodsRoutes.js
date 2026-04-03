const express = require("express");
const router = express.Router();
const neighborhoodsController = require("../controllers/neighborhoodsController");

// GET /neighborhoods/:locality_id
router.get("/:locality_id", neighborhoodsController.getNeighborhoods);

module.exports = router;