
import React, { useState } from "react";
import HeaderMonthSelector from "../features/dashboard/components/MonthSelector";
import CategoryCard from "../features/dashboard/components/CategoryCard";
import AddExpenseFAB from "../features/dashboard/components/AddExpenseFAB";
import ExpenseFormModal from "../features/dashboard/components/ExpenseFormModal";
import {type Category } from "../features/dashboard/types";
import { monthYearLabel } from "../utils/date";

const initialCategories: Category[] = [
  { id: "1", name: "Food", color: "#f97316", budget: 5000, spent: 2220 },
  { id: "2", name: "Rent", color: "#06b6d4", budget: 20000, spent: 15000 },
  { id: "3", name: "Transport", color: "#a78bfa", budget: 5000, spent: 6120 },
  { id: "4", name: "Entertainment", color: "#f43f5e", budget:5000, spent: 3000 },
];

const Dashboard: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  const handleAddExpense = (categoryId: string, amount: number) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId ? { ...cat, spent: +(cat.spent + amount).toFixed(2) } : cat
      )
    );
    setShowExpenseModal(false);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-app text-slate-100">
      <div className="max-w-7xl mx-auto">
        <HeaderMonthSelector
          currentMonth={currentMonth}
          onPrev={() => setCurrentMonth(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
          onNext={() => setCurrentMonth(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
        />

        <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(cat => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </section>

        <div className="mt-8 text-sm text-slate-300">
          Showing summary for <strong>{monthYearLabel(currentMonth)}</strong>
        </div>
      </div>

      <AddExpenseFAB onOpen={() => setShowExpenseModal(true)} />
      <ExpenseFormModal
        open={showExpenseModal}
        onClose={() => setShowExpenseModal(false)}
        categories={categories}
        onSubmit={handleAddExpense}
      />
    </div>
  );
};

export default Dashboard;
