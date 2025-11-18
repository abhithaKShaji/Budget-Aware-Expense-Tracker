// src/features/expense/AddExpenseFAB.tsx
import React from "react";
import { Plus } from "lucide-react";

interface Props {
  onOpen: () => void;
}

const AddExpenseFAB: React.FC<Props> = ({ onOpen }) => {
  return (
    <>
      {/* Desktop: small add button at top-right could be placed in layout. Here we show mobile FAB */}
      <button
        onClick={onOpen}
        aria-label="Add expense"
        className="fixed right-5 bottom-5 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-2xl bg-linear-to-br from-indigo-500 to-fuchsia-600 text-white hover:scale-105 transition-transform"
      >
        <Plus size={20} />
      </button>
    </>
  );
};

export default AddExpenseFAB;
