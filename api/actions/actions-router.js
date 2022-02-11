// Write your "actions" router here!
const router = require("express").Router();
const Actions = require("./actions-model");

router.get("/", (req, res) => {});
router.get("/:id", (req, res) => {});
router.post("/", (req, res) => {});
router.put("/:id", (req, res) => {});
router.delete("/:id", (req, res) => {});

module.exports = router;
