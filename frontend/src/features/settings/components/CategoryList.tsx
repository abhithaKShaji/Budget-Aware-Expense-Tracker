import { useState } from "react";
import {type Category } from "../types";

interface Props {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

export default function CategoryList({ categories, onEdit, onDelete }: Props) {
  return (
    <div className="w-full mt-6">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-black text-left">
              <th className="p-3">Color</th>
              <th className="p-3">Category</th>
              <th className="p-3">Budget</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((cat) => (
              <tr key={cat._id} className="border-b">
                <td className="p-3">
                  <span
                    className="inline-block w-4 h-4 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                </td>

                <td className="p-3">{cat.name}</td>
                <td className="p-3">₹{cat.monthlyLimit}</td>

                <td className="p-3 text-center">
                  <button
                    onClick={() => onEdit(cat)}
                    className="px-3 py-1 text-white bg-blue-500 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(cat._id)}
                    className="px-3 py-1 text-white bg-red-500 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile List */}
      <div className="md:hidden space-y-4">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="p-4 bg-white rounded shadow flex justify-between items-center"
          >
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="inline-block w-4 h-4 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
                <p className="font-semibold">{cat.name}</p>
              </div>
              <p className="text-gray-600 text-sm mt-1">Budget: ₹{cat.monthlyLimit}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onEdit(cat)}
                className="px-3 py-1 text-white bg-blue-500 rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(cat._id)}
                className="px-3 py-1 text-white bg-red-500 rounded text-sm"
              >
                Del
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
