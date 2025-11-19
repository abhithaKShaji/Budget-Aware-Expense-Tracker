import { useState, useEffect } from "react";
import {type Category } from "../../settings/types";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (category: Omit<Category, "_id">, id?: string) => void;
  editingCategory?: Category | null;
  loading?: boolean;
}

export default function CategoryModal({
  open,
  onClose,
  onSave,
  editingCategory,
  loading = false,
}: Props) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#000000");
  const [budget, setBudget] = useState<number>(0);

  useEffect(() => {
    if (editingCategory) {
      setName(editingCategory.name);
      setColor(editingCategory.color);
      setBudget(editingCategory.monthlyLimit ?? 0); // FIX
    } else {
      setName("");
      setColor("#000000");
      setBudget(0);
    }
  }, [editingCategory]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <div className="bg-gray-800 w-full max-w-md p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">
          {editingCategory ? "Edit Category" : "Add Category"}
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Category Name"
            className="w-full p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="color"
            className="w-full p-2 border rounded"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />

          <input
            type="number"
            placeholder="Monthly Budget"
            className="w-full p-2 border rounded"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
          />

          <div className="flex justify-end gap-3 mt-4">
            <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
              Cancel
            </button>

   <button
  onClick={() =>
    onSave(
      {
        name,
        color,
        monthlyLimit: budget,
        spent: editingCategory ? editingCategory.spent : 0
      },
      editingCategory?._id
    )
  }
  disabled={loading}
  className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
>
  {loading ? "Saving..." : editingCategory ? "Update" : "Add"}
</button>


          </div>
        </div>
      </div>
    </div>
  );
}
