const Actions = require("./actions-model");

const validateActionId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const action = await Actions.get(id);
    if (!action) {
      res.status(404).json({
        message: `Actions with id ${id} not found.`,
      });
    } else {
      req.action = action;
      next();
    }
  } catch (err) {
    next(err);
  }
};
module.exports = {
  validateActionId,
};
