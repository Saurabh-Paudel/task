import { useState } from "react";
import { Handle, Position } from "reactflow";
import {
  Pencil,
  Copy as CopyIcon,
  Trash,
  Database,
  BarChart3,
  Shield,
  Zap,
  RotateCcw,
  FileOutput,
} from "lucide-react";

const iconMap = {
  ingest: Database,
  profiler: BarChart3,
  deduplication: Shield,
  transformer: Zap,
  deidentification: RotateCcw,
  destination: FileOutput,
};

const colorMap = {
  blue: "text-blue-600 bg-blue-50 border-blue-200",
  indigo: "text-indigo-600 bg-indigo-50 border-indigo-200",
  green: "text-green-600 bg-green-50 border-green-200",
  purple: "text-purple-600 bg-purple-50 border-purple-200",
  orange: "text-orange-600 bg-orange-50 border-orange-200",
  red: "text-red-600 bg-red-50 border-red-200",
};

interface CustomNodeProps {
  data: {
    label: string;
    status: string;
    icon: keyof typeof iconMap;
    color: keyof typeof colorMap;
  };
  selected?: boolean;
}

export default function CustomNode({ data, selected }: CustomNodeProps) {
  const Icon = iconMap[data.icon] || Database;
  const colorClass = colorMap[data.color];

  const [hovered, setHovered] = useState(false);

  const handleEdit = () => {
    alert(`Edit ${data.label}`);
  };

  const handleCopy = () => {
    alert(`Copy ${data.label}`);
  };

  const handleDelete = () => {
    alert(`Delete ${data.label}`);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`bg-white rounded-lg border shadow-sm min-w-auto min-h-[51px] transition-all cursor-pointer ${
        selected
          ? "border-blue-500 shadow-lg ring-2 ring-blue-200"
          : "border-gray-200 hover:shadow-md"
      }`}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="w-2 h-2 bg-gray-400 border-gray-400"
      />

      <div className="px-3 py-2 flex items-center justify-between gap-2 relative">
        <div className={`p-1.5 rounded ${colorClass}`}>
          <Icon className="h-3 w-3" />
        </div>

        <div className="flex flex-col gap- items-start justify-start">
          <span className="font-medium text-sm text-gray-900">
            {data.label}
          </span>
          <span className="text-xs text-gray-500">{data.status}</span>
        </div>

        {hovered && (
          <div className="absolute top-1 right-1 flex gap-1 bg-white rounded px-1 shadow border">
            <Pencil
              onClick={handleEdit}
              className="w-3 h-3 text-gray-600 hover:text-blue-600 cursor-pointer"
            />
            <CopyIcon
              onClick={handleCopy}
              className="w-3 h-3 text-gray-600 hover:text-blue-600 cursor-pointer"
            />
            <Trash
              onClick={handleDelete}
              className="w-3 h-3 text-gray-600 hover:text-red-500 cursor-pointer"
            />
          </div>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="w-2 h-2 bg-gray-400 border-gray-400"
      />
    </div>
  );
}
