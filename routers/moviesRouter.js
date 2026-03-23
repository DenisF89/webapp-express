const express = require("express");
const moviesController = require("../controllers/moviesController");
const checkId = require("../middleware/checkId");

const router = express.Router();        //creo il router

router.get("/", moviesController.index);

router.get("/:id", checkId, moviesController.show);

router.delete("/:id", checkId, moviesController.destroy);

module.exports = router;