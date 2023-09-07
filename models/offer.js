const mongoose = require("mongoose");

const OfferSchema = new mongoose.Schema({
  offer_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  sort_order: {
    type: Number,
    required: true,
  },
  content: {
    type: Array,
    required: true,
  },
  schedule: {
    type: {},
    required: true,
  },
  target: {
    type: String,
    required: true,
  },
  pricing: {
    type: Array,
    required: true,
  },
});

const OfferModel = mongoose.model("offers", OfferSchema);
module.exports = OfferModel;
