const PlayerModel = require("../models/player");

const addPlayer = async (req, res) => {
  try {
    const newPlayer = new PlayerModel(req.body);
    await newPlayer.save();
    res.status(202).json({ message: "Player added successfully" });
  } catch (error) {
    res
      .status(406)
      .json({ error: "Something went wrong while adding the player" });
  }
};

module.exports = addPlayer;
