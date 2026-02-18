import type { Simulation } from "../../types";
import { Card } from "../../../../shared/components";
import { formatDateTime } from "../../../../shared/utils/helpers";

interface SimulationCardProps {
  simulation: Simulation;
  onRun?: (id: string) => void;
}

const statusColors = {
  draft: "bg-gray-100 text-gray-800",
  running: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
};

export const SimulationCard = ({ simulation, onRun }: SimulationCardProps) => {
  return (
    <Card>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {simulation.name}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {simulation.description}
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[simulation.status]}`}
          >
            {simulation.status.toUpperCase()}
          </span>
        </div>

        <div className="text-sm text-gray-500">
          Created: {formatDateTime(simulation.createdAt)}
        </div>

        {simulation.parameters.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Parameters
            </h4>
            <div className="space-y-2">
              {simulation.parameters.map((param, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-gray-700">{param.name}</span>
                  <span className="text-gray-900 font-medium">
                    {param.value} {param.unit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {simulation.results && simulation.results.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Results</h4>
            <div className="space-y-2">
              {simulation.results.slice(0, 5).map((result, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-gray-700">{result.metric}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900 font-medium">
                      {result.value.toFixed(2)}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        result.status === "critical"
                          ? "bg-red-500"
                          : result.status === "warning"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {simulation.status === "draft" && onRun && (
          <button
            onClick={() => onRun(simulation.id)}
            className="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            Run Simulation
          </button>
        )}
      </div>
    </Card>
  );
};
