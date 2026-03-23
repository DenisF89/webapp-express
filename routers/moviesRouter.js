const express = require("express");
const router = express.Router();        //creo il router
const moviesController = require("../controllers/moviesController");

router.get("/", moviesController.index);

router.get("/:id", moviesController.show);

module.exports = router;