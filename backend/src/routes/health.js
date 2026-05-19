const { health } = require('../controllers/healthController');

module.exports = (router) => {
  router.get('/health', health);
};
