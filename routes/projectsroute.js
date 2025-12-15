const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const auth = require("../middleware/authMiddleware");

router.get("/", auth(["admin", "manager", "user"]), async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

router.post("/", auth(["admin", "manager"]), async (req, res) => {
  const project = await Project.create({
    title: req.body.title,
    description: req.body.description,
    createdBy: req.user._id,
  });

  res.status(201).json(project);
});


router.put("/:id", auth(["admin", "manager"]), async (req, res) => {
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  res.json(project);
});


router.delete("/:id", auth(["admin"]), async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  res.json({ message: "Project deleted successfully" });
});

module.exports = router;
