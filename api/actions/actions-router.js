// Write your "actions" router here!
const router = require("express").Router();
const Actions = require("./actions-model");
const { validateActionId } = require("./actions-middlware");

router.get("/", (req, res, next) => {
  Actions.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch(next);
});

router.get("/:id", validateActionId, (req, res) => {
  res.status(200).json(req.action);
});

router.post("/", (req, res) => {});
router.put("/:id", (req, res) => {});
router.delete("/:id", (req, res) => {});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: "something bad happened inside projects router",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
