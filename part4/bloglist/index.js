const { app, mongoConnection } = require("./app");
const config = require("./utils/config");
const logger = require("./utils/logger");

mongoConnection
  .then(() => {
    app.listen(config.PORT, () => {
      logger.info(`Server running on port ${config.PORT}`);
    });
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
    process.exit(1);
  });
