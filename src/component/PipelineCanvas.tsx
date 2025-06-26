"use client";

import type React from "react";

import { useCallback, useRef, useState } from "react";
import ReactFlow, {
  type Node,
  type Edge,
  addEdge,
  type Connection,
  useNodesState,
  useEdgesState,
  Background,
  BackgroundVariant,
  type OnSelectionChangeParams,
  SelectionMode,
  ReactFlowInstance,
} from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./CustomeNode";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes: Node[] = [];

const initialEdges: Edge[] = [];

interface PipelineCanvasProps {
  selectedNodes: string[];
  onNodeSelection: (nodeIds: string[]) => void;
}

export default function PipelineCanvas({
  onNodeSelection,
}: PipelineCanvasProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);
  const [nodeIdCounter, setNodeIdCounter] = useState(7);

  const [dialogNode, setDialogNode] = useState<Node | null>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      const data = event.dataTransfer.getData("application/reactflow");

      if (typeof data === "undefined" || !data || !reactFlowBounds) {
        return;
      }

      const nodeData = JSON.parse(data);
      const position = reactFlowInstance?.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode: Node = {
        id: `${nodeIdCounter}`,
        type: nodeData.type,
        position: position || { x: 0, y: 0 },
        data: nodeData.data,
        selected: false,
      };

      setNodes((nds) => nds.concat(newNode));
      setNodeIdCounter((id) => id + 1);
    },
    [reactFlowInstance, nodeIdCounter, setNodes]
  );

  const onSelectionChange = useCallback(
    ({ nodes: selectedNodes }: OnSelectionChangeParams) => {
      const nodeIds = selectedNodes.map((node) => node.id);
      onNodeSelection(nodeIds);
    },
    [onNodeSelection]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setDialogNode(node);
  }, []);

  return (
    <div className="w-full h-full" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onSelectionChange={onSelectionChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        style={{ width: "100%", height: "100%" }}
        selectionMode={SelectionMode.Partial}
        multiSelectionKeyCode="Shift"
        deleteKeyCode="Delete"
        selectNodesOnDrag={false}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={3}
          color="#e2e8f0"
        />
      </ReactFlow>

      {/* Modal dialog for clicked node */}
      {dialogNode && (
        <Sheet
          open={!!dialogNode}
          onOpenChange={(open) => !open && setDialogNode(null)}
        >
          <SheetContent side="right" className="h-full w-[500px] rounded-l-lg">
            <SheetHeader>
              <SheetTitle className="flex items-center justify-between mt-2">
                <p>Stage Configuration</p>
                <span className="text-sm bg-[#3B82F6]/[12%] text-[#3B82F6] font-normal py-[6px] px-2 rounded-xl">
                  {dialogNode?.data.label}
                </span>
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col items-center justify-center h-full border-t-1 border-b-1 border-gray-200">
              <p className="text-gray-500">
                {dialogNode?.data.label} configuration component comes here
              </p>
            </div>
            <SheetFooter className="flex flex-row items-center justify-center gap-4">
              <Button
                onClick={() => setDialogNode(null)}
                className="w-[180px] bg-gray-200 text-gray-800"
              >
                Cancel
              </Button>
              <Button
                variant="default"
                className="w-[180px] bg-[#028F33] text-white rounded-xl"
              >
                Save configuration
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
