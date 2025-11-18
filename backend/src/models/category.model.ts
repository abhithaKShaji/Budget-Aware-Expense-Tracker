import { Schema, model, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  color: string;
  monthlyLimit: number;
  createdAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, trim: true },
    color: { type: String, required: true },
    monthlyLimit: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const Category = model<ICategory>("Category", CategorySchema);
