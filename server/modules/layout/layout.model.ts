import mongoose, { Document, model, Model, Schema } from "mongoose";

interface FaqItem extends Document {
  question: string;
  answer: string;
}
interface Category extends Document {
  title: string;
}

interface BannerImage extends Document {
  public_id: string;
  url: string;
}

interface Layout extends Document {
  type: string;
  faq: FaqItem[];
  categories: Category[];
  banner: {
    image: BannerImage;
    title: string;
    subTitle: string;
  };
}

const faqSchema = new Schema<FaqItem>({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

const categorySchema = new Schema<Category>({
  title: { type: String, required: true },
});

const bannerImageSchema = new Schema<BannerImage>({
  public_id: { type: String },
  url: { type: String },
});

const layoutSchema = new Schema<Layout>({
  type: { type: String },
  faq: [faqSchema],
  categories: [categorySchema],
  banner: {
    image: bannerImageSchema,
    title: { type: String },
    subTitle: { type: String },
  },
});

const LayoutModel = model<Layout>("Layout", layoutSchema);
export default LayoutModel;
