const express = require("express");
const moviesController = require("../controllers/moviesController");
const checkId = require("../middleware/checkId");

const router = express.Router();        //creo il router

router.get("/", moviesController.index);

router.get("/:id", checkId, moviesController.show);

router.delete("/:id/review/:idR", checkId, moviesController.destroy);

router.post("/:id", moviesController.store );

module.exports = router;