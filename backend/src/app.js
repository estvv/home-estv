const express = require('express');
const cors = require('cors');
const config = require('./config');
const StatusService = require('./services/statusService');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

const statusService = new StatusService({
  configPath: config.services.configPath,
  cacheTtl: config.cache.ttl * 1000,
  timeout: config.check.timeout
});

app.use(cors());
app.use(express.json());

const apiRouter = express.Router();
routes(apiRouter, statusService);
app.use('/api', apiRouter);

app.use(errorHandler);

module.exports = app;
