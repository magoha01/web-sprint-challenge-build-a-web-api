// Write your "actions" router here!
const router = require("express").Router();
const Actions = require("./actions-model");
const { validateActionId, validateAction } = require("./actions-middlware");

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

router.post("/", validateAction, (req, res, next) => {
  Actions.insert(req.body)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch(next);
});

router.put("/:id", validateActionId, validateAction, (req, res, next) => {
  Actions.update(req.params.id, req.body)
    .then((action) => {
      res.json(action);
      console.log(action);
    })
    .catch(next);
});

router.delete("/:id", (req, res) => {

});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: "Problem inside actions router",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
