import mongoose from "mongoose";
// Category Schema
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  description: { type: String, trim: true },
  image: { type: String, trim: true }, // Added image field
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Middleware to update the updatedAt field before saving
categorySchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
