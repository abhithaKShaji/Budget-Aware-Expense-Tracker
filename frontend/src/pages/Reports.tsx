import React, { useEffect, useState } from "react";
import MonthSelector from "../features/dashboard/components/MonthSelector";
import ReportsTable from "../features/reports/components/ReportsTable";
import ReportsChart from "../features/reports/components/ReportsChart";
import {type CategoryReport } from "../features/dashboard/types";

const ReportsPage: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [reports, setReports] = useState<CategoryReport[]>([]);

  // Dummy data — replace with API call
  const fetchReports = () => {
    setReports([
      { category: "Food", spent: 4500, budget: 5000 },
      { category: "Travel", spent: 7000, budget: 6000 },
      { category: "Shopping", spent: 3500, budget: 4000 },
      { category: "Bills", spent: 2000, budget: 2500 },
    ]);
  };

  useEffect(() => {
    fetchReports();
  }, [currentMonth]);

  const goToPrevMonth = () => {
    const prev = new Date(currentMonth);
    prev.setMonth(prev.getMonth() - 1);
    setCurrentMonth(prev);
  };

  const goToNextMonth = () => {
    const next = new Date(currentMonth);
    next.setMonth(next.getMonth() + 1);
    setCurrentMonth(next);
  };

  return (
    <div className="p-4 md:p-8 text-white">
      <MonthSelector
        currentMonth={currentMonth}
        onPrev={goToPrevMonth}
        onNext={goToNextMonth}
      />

      {/* Table */}
      <ReportsTable reports={reports} />

      {/* Optional Chart */}
      <ReportsChart reports={reports} />
    </div>
  );
};

export default ReportsPage;
