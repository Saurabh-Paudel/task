"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronRight, Play } from "lucide-react";

export default function Header() {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" className="p-1">
          <ArrowLeft size={16} />
        </Button>
        <span className="h-4 border border-gray-300" />
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <span>ETL Pipeline</span>
          <span>
            <ChevronRight size={12} />
          </span>
          <span className="text-gray-900">
            Data analysis execute pipeline-v2
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="px-2 py-1 bg-gray-100 rounded text-xs">Draft</span>
          <span className="text-[#00AC3C] text-xs font-medium">
            Saved 1s ago
          </span>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium">
          Run
          <Play className="h-4 w-4 mr-1" />
        </Button>
      </div>
    </div>
  );
}
