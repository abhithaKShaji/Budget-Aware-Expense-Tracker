import { useState } from "react";
import CategoryList from "../features/settings/components/CategoryList";
import CategoryModal from "../features/settings/components/CategoryModal";
import {type Category } from "../features/settings/types";
import useCreateCategory from "../features/settings/hooks/useCreateCategory";
import useGetCategories from "../features/settings/hooks/useGetCategories";

export default function Categories() {
  const { categories, loading: fetching, error, refetch } = useGetCategories();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const { createCategory, loading: creating } = useCreateCategory();

  const handleSave = async (data: Omit<Category, "_id">, id?: string) => {
    if (id) {
      // Update locally
      await refetch();
      setModalOpen(false);
      setEditingCategory(null);
      return;
    }

    const newCategory = await createCategory({
      name: data.name,
      color: data.color,
      monthlyLimit: data.monthlyLimit,
    });

    if (newCategory) {
      refetch();
      setModalOpen(false);
      setEditingCategory(null);
    }
  };

  const handleDelete = () => {
    // local delete until you build API
    // Later replace with DELETE API call
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Categories</h1>

        <button
          className="px-5 py-2 bg-green-600 text-white rounded"
          onClick={() => setModalOpen(true)}
        >
          + Add Category
        </button>
      </div>

      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      {fetching && <p className="text-gray-600 mt-2">Loading...</p>}

      <CategoryList
        categories={categories}
        onEdit={(cat) => {
          setEditingCategory(cat);
          setModalOpen(true);
        }}
        onDelete={handleDelete}
      />

      <CategoryModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingCategory(null);
        }}
        onSave={handleSave}
        editingCategory={editingCategory}
        loading={creating}
      />
    </div>
  );
}
