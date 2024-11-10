import mongoose, { Document, Model, Schema } from "mongoose";

export interface ICategories extends Document {
  name: string;
  slug: string;
}

const categoriesSchema = new Schema<ICategories>(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true },
  },
  { timestamps: true }
);
categoriesSchema.pre("save", function (next) {
  this.slug = this.name.toLowerCase().replace(/ /g, "-");
  next();
});

categoriesSchema.index({ name: 1 });
categoriesSchema.index({ slug: 1 });
const CategoriesModel: Model<ICategories> = mongoose.model(
  "Categories",
  categoriesSchema
);

export default CategoriesModel;
