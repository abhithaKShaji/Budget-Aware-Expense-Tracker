import React from "react";
import {type CategoryReport } from "../../dashboard/types";

interface Props {
  reports: CategoryReport[];
}

const ReportsTable: React.FC<Props> = ({ reports }) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10 mt-6">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-white/5 text-left text-gray-300">
            <th className="p-3">Category</th>
            <th className="p-3">Spent</th>
            <th className="p-3">Budget</th>
            <th className="p-3">Remaining</th>
          </tr>
        </thead>

        <tbody>
          {reports.map((item, index) => {
            const remaining = item.budget - item.spent;

            return (
              <tr
                key={index}
                className="border-b border-white/5 hover:bg-white/5 transition"
              >
                <td className="p-3 font-medium">{item.category}</td>
                <td className="p-3">{item.spent}</td>
                <td className="p-3">{item.budget}</td>

                <td
                  className={`p-3 font-semibold ${
                    remaining < 0 ? "text-red-500" : "text-green-400"
                  }`}
                >
                  {remaining}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsTable;
