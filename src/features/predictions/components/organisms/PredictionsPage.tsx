import { useSearchParams } from 'react-router';
import { usePredictions } from '../../hooks/usePredictions';
import { PredictionCard } from '../molecules';
import { LoadingSpinner } from '../../../../shared/components';
import { Layout } from '../../../layout';

export const PredictionsPage = () => {
  const [searchParams] = useSearchParams();
  const patientId = searchParams.get('patientId') || undefined;
  const { data: predictions, isLoading, error } = usePredictions(patientId);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-96">
          <LoadingSpinner />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-red-600">Error loading predictions: {error.message}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Prediction Results</h1>
          <p className="text-gray-600 mt-1">
            AI-powered clinical outcome predictions
            {patientId && ' for selected patient'}
          </p>
        </div>

        {predictions && predictions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {predictions.map((prediction) => (
              <PredictionCard key={prediction.id} prediction={prediction} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">No predictions available</p>
          </div>
        )}
      </div>
    </Layout>
  );
};
