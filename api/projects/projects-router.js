// Write your "projects" router here!
const router = require("express").Router();
const Projects = require("./projects-model");
const {
  validateProjectId,
  validateProject,
  validateCompleted,
} = require("./projects-middleware");

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
      res.status(201).json({
        ...project,
      });
    })
    .catch(next);
});

router.put(
  "/:id",
  validateProjectId,
  validateProject,
  validateCompleted,
  (req, res, next) => {
    Projects.update(req.params.id, req.body)
      .then((editedProject) => {
        res.json(editedProject);
        console.log(editedProject);
      })
      .catch(next);
  }
);

// router.put(
//   "/:id",
//   validateProjectId,
//   validateProject,
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const changes = req.body;
//       const changedProject = await Projects.get(id).update(id, changes);
//       res.json(changedProject);
//       console.log(changedProject);
//     } catch (err) {
//       next(err);
//     }
//   }
// );

router.delete("/:id", validateProjectId, async (req, res, next) => {
  try {
    await Projects.remove(req.params.id);
    res.json(req.project);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/actions", validateProjectId, async (req, res, next) => {
  try {
    const getActions = await Projects.getProjectActions(req.params.id);
    res.json(getActions);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: "Problem inside projects router",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;

// router.put("/:id", validateProjectId, validateProject, (req, res, next) => {
//   Projects.update(req.params.id, req.body)
//     .then((project) => {
//       res.json(project);
//       console.log(project);
//     })
//     .catch(next);
// });
