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


router.get(
  "/:store_id",
  getStoreById
);


module.exports = router;