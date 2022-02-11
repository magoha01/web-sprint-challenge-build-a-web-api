// add middlewares here related to projects
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

const validateProject = (req, res, next) => {};

module.exports = {
  validateProjectId,
  validateProject,
};
