const healthRoutes = require('./health');
const statusRoutes = require('./status');

module.exports = (router, statusService) => {
  healthRoutes(router);
  statusRoutes(router, statusService);
};
