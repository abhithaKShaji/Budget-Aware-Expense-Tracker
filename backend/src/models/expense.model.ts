import { Schema, model, Document, Types } from "mongoose";

export interface IExpense extends Document {
  user: Types.ObjectId;
  category: Types.ObjectId;
  amount: number;
  date: Date;
}

const expenseSchema = new Schema<IExpense>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

export default model<IExpense>("Expense", expenseSchema);
