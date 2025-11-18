// src/features/expense/ExpenseFormModal.tsx
import React, { useState } from "react";
import { X } from "lucide-react";
import { type Category } from "../types";

interface Props {
  open: boolean;
  onClose: () => void;
  categories: Category[];
  onSubmit: (categoryId: string, amount: number, date: string) => void;
}

const ExpenseFormModal: React.FC<Props> = ({ open, onClose, categories, onSubmit }) => {
  const [categoryId, setCategoryId] = useState<string>(categories[0]?.id ?? "");
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));

  React.useEffect(() => {
    if (categories.length && !categoryId) setCategoryId(categories[0].id);
  }, [categories]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(amount);
    if (!categoryId || isNaN(amt) || amt <= 0) {
      alert("Please select category and enter a valid amount.");
      return;
    }
    onSubmit(categoryId, amt, date);
    setAmount("");
    setDate(new Date().toISOString().slice(0, 10));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <form
        onSubmit={handleSubmit}
        className="relative bg-slate-900 text-slate-100 rounded-t-xl sm:rounded-xl w-full max-w-md p-6 z-10"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Add Expense</h3>
          <button type="button" onClick={onClose} className="p-1 rounded hover:bg-white/5">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">Category</label>
            <select
              className="w-full bg-slate-800 rounded p-2"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              {categories.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">Amount</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-slate-800 rounded p-2"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-slate-800 rounded p-2"
            />
          </div>

          <div className="flex items-center justify-end gap-3">
            <button type="button" onClick={onClose} className="px-3 py-2 rounded bg-white/6">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ExpenseFormModal;
