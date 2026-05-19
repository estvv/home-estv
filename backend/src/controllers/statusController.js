const status = (statusService) => {
  return async (req, res, next) => {
    try {
      const data = await statusService.checkAll();
      res.json(data);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = { status };
