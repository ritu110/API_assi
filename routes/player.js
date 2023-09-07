const router = require("express").Router();
const addPlayer = require("../controllers/player");

router.post("/new-player", addPlayer);

module.exports = router;
