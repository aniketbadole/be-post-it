const express = require("express");
const searchController = require("../controllers/searchController");
const router = express.Router();

// Create a new search
router.get("/search", searchController.search);

module.exports = router;
