import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import {type CategoryReport } from "../../dashboard/types";

interface Props {
  reports: CategoryReport[];
}

const ReportsChart: React.FC<Props> = ({ reports }) => {
  const data = reports.map((item) => ({
    category: item.category,
    spent: item.spent,
    budget: item.budget,
    remaining: item.budget - item.spent,
  }));

  return (
    <div className="w-full h-64 mt-6">
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="spent" />
          <Bar dataKey="budget" />
          <Bar dataKey="remaining" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReportsChart;
