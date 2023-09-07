const router = require("express").Router();
const {
  addOrUpdateOffer,
  getOffers,
  deleteOffer,
} = require("../controllers/offer");

router.get("/", getOffers);
router.put("/:id", addOrUpdateOffer);
router.delete("/:id", deleteOffer);

module.exports = router;
