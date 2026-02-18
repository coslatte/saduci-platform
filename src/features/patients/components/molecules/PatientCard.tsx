import { Link } from "react-router";
import type { Patient } from "../../types";
import { formatDate, calculateAge, cn } from "../../../../shared/utils/helpers";

interface PatientCardProps {
  patient: Patient;
}

const statusColors = {
  stable: "bg-green-100 text-green-800",
  critical: "bg-red-100 text-red-800",
  recovering: "bg-blue-100 text-blue-800",
  deceased: "bg-gray-100 text-gray-800",
};

export const PatientCard = ({ patient }: PatientCardProps) => {
  const age = calculateAge(patient.dateOfBirth);

  return (
    <Link
      to={`/patients/${patient.id}`}
      className="block p-6 transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900">
            {patient.firstName} {patient.lastName}
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            {age} years • {patient.gender}
          </p>
        </div>
        <span
          className={cn(
            "px-3 py-1 rounded-full text-xs font-medium",
            statusColors[patient.status]
          )}
        >
          {patient.status.toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
        <div>
          <p className="text-gray-500">Room</p>
          <p className="font-medium text-gray-900">{patient.roomNumber}</p>
        </div>
        <div>
          <p className="text-gray-500">Bed</p>
          <p className="font-medium text-gray-900">{patient.bedNumber}</p>
        </div>
        <div className="col-span-2">
          <p className="text-gray-500">Diagnosis</p>
          <p className="font-medium text-gray-900">{patient.diagnosis}</p>
        </div>
        <div className="col-span-2">
          <p className="text-gray-500">Admitted</p>
          <p className="font-medium text-gray-900">
            {formatDate(patient.admissionDate)}
          </p>
        </div>
      </div>
    </Link>
  );
};
