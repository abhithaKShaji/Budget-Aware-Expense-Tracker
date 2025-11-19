import React, { useState } from "react";
import HeaderMonthSelector from "../features/dashboard/components/MonthSelector";
import CategoryCard from "../features/dashboard/components/CategoryCard";
import AddExpenseFAB from "../features/dashboard/components/AddExpenseFAB";
import ExpenseFormModal from "../features/dashboard/components/ExpenseFormModal";

import { monthYearLabel } from "../utils/date";
import useGetCategories from "../features/settings/hooks/useGetCategories";
import useCreateExpense from "../features/dashboard/hooks/useCreateExpense";

import { type Category } from "../features/settings/types";


const Dashboard: React.FC = () => {
  const { categories, loading, error, refetch } = useGetCategories();
  const { createExpense, loading: expenseLoading } = useCreateExpense();

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showExpenseModal, setShowExpenseModal] = useState(false);


  const handleAddExpense = async (
    categoryId: string,
    amount: number,
    date: string
  ) => {
    const result = await createExpense(categoryId, amount, date);

    if (result) {
      await refetch();
      setShowExpenseModal(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-app text-slate-100">
      <div className="max-w-7xl mx-auto">

        {/* Month selector */}
        <HeaderMonthSelector
          currentMonth={currentMonth}
          onPrev={() =>
            setCurrentMonth((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))
          }
          onNext={() =>
            setCurrentMonth((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))
          }
        />

        {/* Categories */}
        {loading && (
          <div className="mt-6 text-center text-slate-300">Loading categories...</div>
        )}

        {error && (
          <div className="mt-6 text-center text-rose-400">{error}</div>
        )}

        {!loading && !error && categories.length > 0 && (
          <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category: Category) => (
              <CategoryCard key={category._id} category={category} />
            ))}
          </section>
        )}

        {!loading && !error && categories.length === 0 && (
          <div className="mt-6 text-center text-slate-400">
            No categories found. Add one in settings.
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-8 text-sm text-slate-300">
          Showing summary for <strong>{monthYearLabel(currentMonth)}</strong>
        </div>
      </div>

      {/* Floating Add Expense Button */}
      <AddExpenseFAB onOpen={() => setShowExpenseModal(true)} />

      {/* Expense Modal */}
     <ExpenseFormModal
  open={showExpenseModal}
  onClose={() => setShowExpenseModal(false)}
  categories={categories}
  onSubmit={handleAddExpense}
  saving={expenseLoading}       
/>

    </div>
  );
};

export default Dashboard;
