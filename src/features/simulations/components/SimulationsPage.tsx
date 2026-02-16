import { useSearchParams } from 'react-router';
import { useSimulations, useRunSimulation } from '../hooks/useSimulations';
import { SimulationCard } from './SimulationCard';
import { LoadingSpinner } from '../../../shared/components';
import { Layout } from '../../layout';

export const SimulationsPage = () => {
  const [searchParams] = useSearchParams();
  const patientId = searchParams.get('patientId') || undefined;
  const { data: simulations, isLoading, error } = useSimulations(patientId);
  const { mutate: runSimulation } = useRunSimulation();

  const handleRunSimulation = (id: string) => {
    runSimulation(id);
  };

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
          <p className="text-red-600">Error loading simulations: {error.message}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Simulations</h1>
            <p className="text-gray-600 mt-1">
              Clinical scenario simulations
              {patientId && ' for selected patient'}
            </p>
          </div>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
            New Simulation
          </button>
        </div>

        {simulations && simulations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {simulations.map((simulation) => (
              <SimulationCard
                key={simulation.id}
                simulation={simulation}
                onRun={handleRunSimulation}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">No simulations found</p>
            <button className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
              Create Your First Simulation
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};
