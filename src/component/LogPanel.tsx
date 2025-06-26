"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function LogsPanel() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className=" bg-white border-l border-gray-200 flex flex-col rounded-lg">
      <div className="p-4 border-b border-gray-200 rounded-t-lg">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center justify-between w-full text-left"
        >
          <h2 className="font-medium text-gray-900">Logs</h2>
          <ChevronDown
            className={`h-4 w-4 text-gray-500 transition-transform ${
              isCollapsed ? "-rotate-90" : ""
            }`}
          />
        </button>
      </div>

      {!isCollapsed && (
        <div className="flex-1 p-4 overflow-auto">
          <div className="text-sm text-gray-500 text-center py-8 bg-gray-50 rounded-lg">
            Log comes here
          </div>
        </div>
      )}
    </div>
  );
}
