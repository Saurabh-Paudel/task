"use client";
import Header from "@/component/Header";
import LogsPanel from "@/component/LogPanel";
import PipelineCanvas from "@/component/PipelineCanvas";
import Sidebar from "@/component/Sidebar";
import { useState, useCallback } from "react";
import { ReactFlowProvider } from "reactflow";

export default function ETLPipeline() {
  const [isRunning, setIsRunning] = useState(false);
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [selectedStages, setSelectedStages] = useState<string[]>([]);

  const handleNodeSelection = useCallback((nodeIds: string[]) => {
    setSelectedNodes(nodeIds);
  }, []);

  const handleStageSelection = useCallback((stageIds: string[]) => {
    setSelectedStages(stageIds);
  }, []);

  return (
    <ReactFlowProvider>
      <div className="h-screen flex flex-col">
        <Header />

        {/* Container for canvas and overlays */}
        <div className="flex-1 relative bg-gray-50">
          {/* Canvas: fill entire container with absolute positioning */}
          <div className="absolute inset-0 z-10">
            <PipelineCanvas
              selectedNodes={selectedNodes}
              onNodeSelection={handleNodeSelection}
            />
          </div>

          {/* Sidebar overlay */}
          <div className="absolute top-0 left-0 h-full z-20 w-72 m-2">
            <Sidebar
              selectedStages={selectedStages}
              onStageSelection={handleStageSelection}
            />
          </div>

          {/* Logs Panel overlay */}
          <div className="absolute top-0 right-0 h-full z-20 w-72 m-2">
            <LogsPanel />
          </div>
        </div>
      </div>
    </ReactFlowProvider>
  );
}
