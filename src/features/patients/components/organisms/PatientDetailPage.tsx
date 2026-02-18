import { useParams, Link } from "react-router";
import {
  usePatient,
  usePatientVitals,
  usePatientTimeline,
} from "../../hooks/usePatients";
import { VitalsChart } from "./VitalsChart";
import { PatientTimeline } from "./PatientTimeline";
import { LoadingSpinner, Card } from "../../../../shared/components";
import { Layout } from "../../../layout";
import { formatDate, calculateAge } from "../../../../shared/utils/helpers";

export const PatientDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: patient, isLoading: patientLoading } = usePatient(id!);
  const { data: vitals, isLoading: vitalsLoading } = usePatientVitals(id!);
  const { data: timeline, isLoading: timelineLoading } = usePatientTimeline(
    id!
  );

  if (patientLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-96">
          <LoadingSpinner />
        </div>
      </Layout>
    );
  }

  if (!patient) {
    return (
      <Layout>
        <div className="py-12 text-center">
          <p className="text-gray-600">Patient not found</p>
          <Link
            to="/patients"
            className="inline-block mt-4 text-primary-600 hover:underline"
          >
            Back to patient list
          </Link>
        </div>
      </Layout>
    );
  }

  const age = calculateAge(patient.dateOfBirth);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Link
              to="/patients"
              className="inline-block mb-2 text-sm text-primary-600 hover:underline"
            >
              ← Back to patients
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">
              {patient.firstName} {patient.lastName}
            </h1>
            <p className="mt-1 text-gray-600">
              {age} years • {patient.gender} • Room {patient.roomNumber}, Bed{" "}
              {patient.bedNumber}
            </p>
          </div>
          <div className="text-right">
            <Link
              to={`/predictions?patientId=${patient.id}`}
              className="inline-block px-4 py-2 mr-2 text-white rounded-md bg-primary-600 hover:bg-primary-700"
            >
              View Predictions
            </Link>
            <Link
              to={`/simulations?patientId=${patient.id}`}
              className="inline-block px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700"
            >
              Run Simulation
            </Link>
          </div>
        </div>

        {/* Patient Info */}
        <Card title="Patient Information">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-semibold text-gray-900 capitalize">
                {patient.status}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Admission Date</p>
              <p className="font-semibold text-gray-900">
                {formatDate(patient.admissionDate)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p className="font-semibold text-gray-900">
                {formatDate(patient.dateOfBirth)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">ID</p>
              <p className="font-semibold text-gray-900">{patient.id}</p>
            </div>
            <div className="col-span-2 md:col-span-4">
              <p className="text-sm text-gray-500">Diagnosis</p>
              <p className="font-semibold text-gray-900">{patient.diagnosis}</p>
            </div>
          </div>
        </Card>

        {/* Vitals */}
        {vitalsLoading ? (
          <Card>
            <LoadingSpinner />
          </Card>
        ) : (
          <VitalsChart vitals={vitals || []} />
        )}

        {/* Timeline */}
        {timelineLoading ? (
          <Card>
            <LoadingSpinner />
          </Card>
        ) : (
          <PatientTimeline events={timeline || []} />
        )}
      </div>
    </Layout>
  );
};
