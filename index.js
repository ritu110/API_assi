const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const dbConnection = require("./db/db");
const userRouter = require("./routes/user");
const playerRouter = require("./routes/player");
const offerRouter = require("./routes/offer");

// middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// database connection
dbConnection(app);

// routes
app.use("/", userRouter);
app.use("/", playerRouter);
app.use("/offer", offerRouter);
