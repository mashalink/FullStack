const express = require("express");
const cors = require("cors");
const path = require("path");

const config = require("./utils/config");
const logger = require("./utils/logger");
const { connectToMongo } = require("./utils/mongo");
const middleware = require("./utils/middleware");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const testingRouter = require("./controllers/testing");

const app = express();
const mongoConnection = connectToMongo();

app.use(cors());
app.use(express.json());

app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

logger.info("NODE_ENV:", process.env.NODE_ENV);
logger.info("Mongo URI:", config.MONGODB_URI);

if (process.env.NODE_ENV === "test") {
  app.use("/api/testing", testingRouter);
}

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(express.static(path.join(__dirname, "dist")));
app.get("/{*path}", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = { app, mongoConnection };
