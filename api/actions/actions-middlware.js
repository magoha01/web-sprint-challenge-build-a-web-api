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

const validateAction= async (req, res, next) => {
  try {
    const { description, notes } = req.body;
    if (!description || !description.trim()) {
      res.status(400).json({
        message: "description required.",
      });
    } else if (!notes || !notes.trim()) {
      res.status(400).json({
        message: "notes, required.",
      });
    } else {
      req.description = description.trim();
      req.notes = notes;
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  validateActionId,
  validateAction
};
