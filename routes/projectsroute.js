const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// READ (ALL)
router.get("/", auth, async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

// CREATE (Admin, Manager)
router.post("/", auth, role("admin", "manager"), async (req, res) => {
  const project = await Project.create({
    ...req.body,
    createdBy: req.user.id,
  });
  res.json(project);
});

// UPDATE (Admin, Manager)
router.put("/:id", auth, role("admin", "manager"), async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(project);
});

// DELETE (Admin ONLY)
router.delete("/:id", auth, role("admin"), async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Project deleted" });
});

module.exports = router;
