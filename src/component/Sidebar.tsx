"use client";

import type React from "react";

import { useState } from "react";
import {
  ChevronDown,
  Database,
  Shield,
  RotateCcw,
  Zap,
  BarChart3,
  FileOutput,
} from "lucide-react";

const stages = [
  {
    id: "ingest",
    name: "Ingest",
    description: "Load raw input data",
    icon: Database,
    color: "text-blue-600 bg-blue-50",
    nodeType: "custom",
  },
  {
    id: "deduplication",
    name: "De-duplication",
    description: "Clean and format",
    icon: Shield,
    color: "text-green-600 bg-green-50",
    nodeType: "custom",
  },
  {
    id: "deidentification",
    name: "De-Identification",
    description: "Remove duplicate entries",
    icon: RotateCcw,
    color: "text-orange-600 bg-orange-50",
    nodeType: "custom",
  },
  {
    id: "transformer",
    name: "Transformer",
    description: "Reshape and map data",
    icon: Zap,
    color: "text-purple-600 bg-purple-50",
    nodeType: "custom",
  },
  {
    id: "profiler",
    name: "Profiler",
    description: "Reshape and map data",
    icon: BarChart3,
    color: "text-indigo-600 bg-indigo-50",
    nodeType: "custom",
  },
  {
    id: "destination",
    name: "Destination Writer",
    description: "Save final output",
    icon: FileOutput,
    color: "text-red-600 bg-red-50",
    nodeType: "custom",
  },
];

interface SidebarProps {
  selectedStages: string[];
  onStageSelection: (stageIds: string[]) => void;
}

const onDragStart = (event: React.DragEvent, stage: (typeof stages)[0]) => {
  event.dataTransfer.setData(
    "application/reactflow",
    JSON.stringify({
      type: stage.nodeType,
      data: {
        label: stage.name,
        status: "Ready",
        icon: stage.id,
        color: stage.color.includes("blue")
          ? "blue"
          : stage.color.includes("green")
          ? "green"
          : stage.color.includes("orange")
          ? "orange"
          : stage.color.includes("purple")
          ? "purple"
          : stage.color.includes("indigo")
          ? "indigo"
          : "red",
      },
    })
  );
  event.dataTransfer.effectAllowed = "move";
};

export default function Sidebar({
  selectedStages,
  onStageSelection,
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleStageClick = (event: React.MouseEvent, stageId: string) => {
    event.preventDefault();
    if (selectedStages.includes(stageId)) {
      onStageSelection([]);
    } else {
      onStageSelection([stageId]);
    }
  };

  return (
    <div className="bg-white  flex flex-col transition-all duration-200 rounded-lg">
      {/* Header with toggle */}
      <div className="p-4 flex items-center justify-between border-b border-gray-200">
        <span className="font-medium text-gray-900">Stages</span>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center text-left"
        >
          <ChevronDown
            className={`h-4 w-4 text-gray-500 transition-transform ${
              isCollapsed ? "-rotate-90" : ""
            }`}
          />
        </button>
      </div>

      {/* Expanded view: full details */}
      {!isCollapsed && (
        <>
          <div className="flex-1 p-4 space-y-3 overflow-y-auto rounded-lg">
            {stages.map((stage) => {
              const Icon = stage.icon;
              const isSelected = selectedStages.includes(stage.id);

              return (
                <div
                  key={stage.id}
                  draggable
                  onDragStart={(event) => onDragStart(event, stage)}
                  onClick={(event) => handleStageClick(event, stage.id)}
                  className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all border ${
                    isSelected
                      ? "bg-blue-50 border-blue-200 ring-2 ring-blue-100"
                      : "hover:bg-gray-50 border-transparent hover:border-gray-200"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${stage.color} ${
                      isSelected ? "ring-1 ring-blue-300" : ""
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className={`font-medium text-sm ${
                        isSelected ? "text-blue-900" : "text-gray-900"
                      }`}
                    >
                      {stage.name}
                    </div>
                    <div
                      className={`text-xs mt-1 ${
                        isSelected ? "text-blue-700" : "text-gray-500"
                      }`}
                    >
                      {stage.description}
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900">
              <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                <span className="text-xs">?</span>
              </div>
              <span>Help & Support</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
