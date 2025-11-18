// src/features/dashboard/CategoryCard.tsx
import React from "react";
import { type Category } from "../types";

interface Props {
  category: Category;
}

const formatCurrency = (n: number) =>
  n.toLocaleString(undefined, { style: "currency", currency: "INR", maximumFractionDigits: 0 });

const CategoryCard: React.FC<Props> = ({ category }) => {
  const { name, color, budget, spent } = category;
  const pct = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;
  const remaining = +(budget - spent);
  const overBudget = remaining < 0;

  return (
    <div className="bg-linear-to-br from-slate-800/60 to-slate-900/60 rounded-2xl p-4 shadow-md border border-white/5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className="w-4 h-4 rounded-full shrink-0"
            style={{ background: color }}
            aria-hidden
          />
          <div>
            <div className="text-lg font-medium">{name}</div>
            <div className="text-xs text-slate-400">Budget: {formatCurrency(budget)}</div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-sm text-slate-300">{formatCurrency(spent)} spent</div>
          <div className="text-xs text-slate-400">Remaining</div>
          <div className={`text-sm font-semibold ${overBudget ? "text-rose-400" : "text-emerald-300"}`}>
            {overBudget ? `-${formatCurrency(Math.abs(remaining))}` : formatCurrency(remaining)}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="w-full h-3 bg-white/6 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${pct}%`,
              background: overBudget ? "linear-gradient(90deg,#ef4444,#c026d3)" : color,
            }}
          />
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-slate-400">
          <span>{Math.round(pct)}%</span>
          {overBudget && (
            <span className="text-rose-400 bg-rose-900/20 px-2 py-0.5 rounded-full text-[10px] font-semibold">
              OVER BUDGET
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
