// Write your "projects" router here!
const router = require("express").Router();
const Projects = require("./projects-model");
const { validateProjectId, validateProject } = require("./projects-middleware");

router.get("/", (req, res, next) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch(next);
});

router.get("/:id", validateProjectId, (req, res) => {
  res.status(200).json(req.project);
});

router.post("/", validateProject, (req, res, next) => {
  Projects.insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch(next);
});

router.put(
  "/:id",
  validateProjectId,
  validateProject,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, description, completed } = req.body;
      // const project = await Projects.get(req.params.id);
      const updatedProject = await Projects.update(id, {
        name: name,
        description: description,
        completed: completed,
      });
      res.status.json(updatedProject);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", (req, res, next) => {});

router.get("/:id/actions", (req, res) => {});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: "something bad happened inside projects router",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
