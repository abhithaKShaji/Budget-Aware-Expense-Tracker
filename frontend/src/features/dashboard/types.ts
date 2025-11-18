// src/types.ts
export interface Category {
  id: string;
  name: string;
  color: string; // tailwind color or hex
  budget: number; // monthly limit
  spent: number;  // amount spent this month
}

export interface CategoryReport {
  category: string;
  spent: number;
  budget: number;
}

