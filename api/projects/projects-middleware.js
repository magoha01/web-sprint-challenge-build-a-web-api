const Projects = require("./projects-model");

const validateProjectId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Projects.get(id);
    if (!project) {
      res.status(404).json({
        message: `Project with id ${id} not found.`,
      });
    } else {
      req.project = project;
      next();
    }
  } catch (err) {
    next(err);
  }
};

const validateProject = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name || !name.trim()) {
      res.status(400).json({
        message: "Name required.",
      });
    } else if (!description || !description.trim()) {
      res.status(400).json({
        message: "Description required.",
      });
    } else {
      req.name = name;
      req.description = description;
      next();
    }
  } catch (err) {
    next(err);
  }
};

const validateCompleted = async (req, res, next) => {
  try {
    const { completed } = req.body;
    if (completed === true || completed === false) {
      req.completed = completed;
      next();
    } else {
      res.status(400).json({
        message: "completed required.",
      });
    }
  } catch (err) {
    res.json({ error: err.message });
    next(err);
  }
};

module.exports = {
  validateProjectId,
  validateProject,
  validateCompleted,
};

// else if (!completed) {
//       res.status(400).json({
//         message: "completion status required.",
//       });
//     }
