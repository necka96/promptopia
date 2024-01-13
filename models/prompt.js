import mongoose, { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Propst is required."],
  },
  tag: {
    type: String,
    required: [true, "Tag is required."],
  },
});

//  modals.Propst - znaci daj nam ako postoji || - ukoliko ne model("Prompt", PromtSchema) - kreiraj novi koji ce se zvati Prompt promst schema
const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
