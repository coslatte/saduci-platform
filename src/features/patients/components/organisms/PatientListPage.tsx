import { usePatients } from "../../hooks/usePatients";
import { PatientCard } from "../molecules";
import { LoadingSpinner } from "../../../../shared/components";
import { Layout } from "../../../layout";

export const PatientListPage = () => {
  const { data: patients, isLoading, error } = usePatients();

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
          <p className="text-red-600">
            Error loading patients: {error.message}
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Patients</h1>
            <p className="text-gray-600 mt-1">
              {patients?.length || 0} patients in ICU
            </p>
          </div>
        </div>

        {patients && patients.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {patients.map((patient) => (
              <PatientCard key={patient.id} patient={patient} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">No patients found</p>
          </div>
        )}
      </div>
    </Layout>
  );
};
