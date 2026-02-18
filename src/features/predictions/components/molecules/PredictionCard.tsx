import type { PredictionResult } from "../../types";
import { Card } from "../../../../shared/components";
import { formatDateTime } from "../../../../shared/utils/helpers";

interface PredictionCardProps {
  prediction: PredictionResult;
}

const predictionTypeLabels = {
  mortality: "Mortality Risk",
  deterioration: "Clinical Deterioration",
  sepsis: "Sepsis Risk",
  ards: "ARDS Risk",
};

const getRiskLevel = (probability: number) => {
  if (probability >= 0.7)
    return { label: "High", color: "text-red-600 bg-red-50" };
  if (probability >= 0.4)
    return { label: "Medium", color: "text-yellow-600 bg-yellow-50" };
  return { label: "Low", color: "text-green-600 bg-green-50" };
};

export const PredictionCard = ({ prediction }: PredictionCardProps) => {
  const risk = getRiskLevel(prediction.probability);
  const confidencePercent = (prediction.confidence * 100).toFixed(0);
  const probabilityPercent = (prediction.probability * 100).toFixed(1);

  return (
    <Card>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {predictionTypeLabels[prediction.predictionType]}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {formatDateTime(prediction.timestamp)}
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${risk.color}`}
          >
            {risk.label} Risk
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Probability</p>
            <p className="text-3xl font-bold text-primary-600">
              {probabilityPercent}%
            </p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Confidence</p>
            <p className="text-3xl font-bold text-gray-900">
              {confidencePercent}%
            </p>
          </div>
        </div>

        {prediction.factors.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Key Factors
            </h4>
            <div className="space-y-2">
              {prediction.factors.slice(0, 5).map((factor, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-gray-700">{factor.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900 font-medium">
                      {factor.value.toFixed(2)}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        factor.impact === "negative"
                          ? "bg-red-500"
                          : factor.impact === "positive"
                            ? "bg-green-500"
                            : "bg-gray-400"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {prediction.recommendation && (
          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-1">
              Recommendation
            </h4>
            <p className="text-sm text-gray-600">{prediction.recommendation}</p>
          </div>
        )}
      </div>
    </Card>
  );
};
