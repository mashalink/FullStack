const mongoose = require("mongoose");

const config = require("./config");
const logger = require("./logger");

let mongoConnection = null;

const connectToMongo = () => {
  if (!mongoConnection) {
    logger.info("connecting to", config.MONGODB_URI);

    mongoConnection = mongoose
      .connect(config.MONGODB_URI, {
        family: 4,
        serverSelectionTimeoutMS: 5000,
      })
      .then(() => {
        logger.info("connected to MongoDB");
        return mongoose.connection;
      });
  }

  return mongoConnection;
};

module.exports = { connectToMongo };
