const mongoose = require("mongoose");
// import mongoose from "mongoose";
const { Schema, model } = mongoose;

const promptSchema = new Schema({
	prompt: {type: String, required: true}
});

const promptModel = mongoose.model('promptModel', promptSchema);

module.exports = promptModel