const mongoose = require("mongoose");
module.exports = mongoose.model(
  "custom-commands",
  new mongoose.Schema({
    Guild: String,
    Command: String,
    Response: Array,
    Delete: Boolean,
    Random: Boolean,
  })
);
