const express = require("express");
const router = express.Router();
const storesController = require("../controllers/storesController");

// GET /stores/search
router.get("/search", storesController.searchStores);

module.exports = router;