const { status } = require('../controllers/statusController');

module.exports = (router, statusService) => {
  router.get('/status', status(statusService));
};
