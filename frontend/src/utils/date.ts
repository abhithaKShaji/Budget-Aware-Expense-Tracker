// src/utils/date.ts
export const monthYearLabel = (date: Date) => {
  return date.toLocaleString(undefined, { month: "long", year: "numeric" });
};

export const firstDayOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

export const addMonths = (date: Date, delta: number) => {
  const d = new Date(date);
  d.setMonth(d.getMonth() + delta);
  return d;
};
