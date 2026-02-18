import type { VitalSign } from "../../types";
import { formatTime } from "../../../../shared/utils/helpers";
import { Card } from "../../../../shared/components";

interface VitalsChartProps {
  vitals: VitalSign[];
}

export const VitalsChart = ({ vitals }: VitalsChartProps) => {
  const latest = vitals[0];

  if (!latest) {
    return (
      <Card title="Vital Signs">
        <p className="text-gray-500">No vital signs recorded</p>
      </Card>
    );
  }

  const vitalItems = [
    {
      label: "Heart Rate",
      value: `${latest.heartRate} bpm`,
      color: "text-red-600",
    },
    {
      label: "Blood Pressure",
      value: `${latest.bloodPressureSystolic}/${latest.bloodPressureDiastolic} mmHg`,
      color: "text-blue-600",
    },
    {
      label: "Temperature",
      value: `${latest.temperature}°C`,
      color: "text-orange-600",
    },
    {
      label: "Respiratory Rate",
      value: `${latest.respiratoryRate} /min`,
      color: "text-green-600",
    },
    {
      label: "Oxygen Saturation",
      value: `${latest.oxygenSaturation}%`,
      color: "text-purple-600",
    },
  ];

  return (
    <Card
      title="Vital Signs"
      subtitle={`Last updated: ${formatTime(latest.timestamp)}`}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {vitalItems.map((item) => (
          <div
            key={item.label}
            className="text-center p-4 bg-gray-50 rounded-lg"
          >
            <p className="text-sm text-gray-600 mb-2">{item.label}</p>
            <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
          </div>
        ))}
      </div>

      {vitals.length > 1 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Recent History
          </h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {vitals.slice(1, 6).map((vital) => (
              <div
                key={vital.id}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-gray-600">
                  {formatTime(vital.timestamp)}
                </span>
                <div className="flex gap-4 text-gray-900">
                  <span>HR: {vital.heartRate}</span>
                  <span>
                    BP: {vital.bloodPressureSystolic}/
                    {vital.bloodPressureDiastolic}
                  </span>
                  <span>SpO2: {vital.oxygenSaturation}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};
