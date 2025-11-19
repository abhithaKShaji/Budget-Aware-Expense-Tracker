import React, { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { type Category } from "../../settings/types";

interface Props {
  open: boolean;
  onClose: () => void;
  categories: Category[];
  onSubmit: (categoryId: string, amount: number, date: string) => void;
  saving: boolean; // <-- NEW
}

const ExpenseFormModal: React.FC<Props> = ({
  open,
  onClose,
  categories,
  onSubmit,
  saving
}) => {
  const [categoryId, setCategoryId] = useState<string>(categories[0]?.id ?? "");
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );

  React.useEffect(() => {
    if (categories.length && !categoryId) setCategoryId(categories[0].id);
  }, [categories]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (saving) return; // prevents double submits

    const amt = parseFloat(amount);
    if (!categoryId || isNaN(amt) || amt <= 0) {
      alert("Please select category and enter a valid amount.");
      return;
    }

    onSubmit(categoryId, amt, date);
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
          {/* Category */}
          <div>
            <label className="block text-sm text-slate-300 mb-1">Category</label>
            <select
              className="w-full bg-slate-800 rounded p-2"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              disabled={saving}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Amount */}
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
              disabled={saving}
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm text-slate-300 mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-slate-800 rounded p-2"
              disabled={saving}
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 rounded bg-white/6"
              disabled={saving}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className={`px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 flex items-center gap-2 ${
                saving ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ExpenseFormModal;
