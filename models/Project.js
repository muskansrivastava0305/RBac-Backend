const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports =
  mongoose.models.Project || mongoose.model("Project", projectSchema);
