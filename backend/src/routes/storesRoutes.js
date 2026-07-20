const express = require("express");
const router = express.Router();

const {
  searchStores,
  getStoreById
} = require("../controllers/storesController");


router.get(
  "/search",
  searchStores
);


module.exports = router;