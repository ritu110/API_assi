const OfferModel = require("../models/offer");

const getOffers = async (req, res) => {
  const query = req.query.query;
  try {
    const response = await OfferModel.find({ query });
    res.status(200).json({ message: "Operation Successfull" });
  } catch (error) {
    res
      .status(404)
      .json({ error: "Something went wrong while fetcching the offers" });
  }
};

const addOrUpdateOffer = async (req, res) => {
  const id = req.params.id;
  try {
    const offer = await OfferModel.findOne({ id });
    if (offer) {
      await OfferModel.updateOne({ ...req.body });
      return res.status(500).json({ message: "Offer updated successfully" });
    }
    const newOffer = new OfferModel(req.body);
    await newOffer.save();
    res.status(202).json({ message: "Offer added successfully" });
  } catch (error) {
    res
      .status(406)
      .json({ error: "Something went wrong while adding the player" });
  }
};

const deleteOffer = async (req, res) => {
  const id = req.params.id;
  try {
    await OfferModel.deleteOne({ id });
    res.status(200).json({ message: "Offer deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: "Something went wrong while deleting" });
  }
};

module.exports = { addOrUpdateOffer, getOffers, deleteOffer };
