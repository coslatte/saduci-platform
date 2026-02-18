import type { TimelineEvent } from '../../types';
import { formatDateTime } from '../../../../shared/utils/helpers';
import { Card } from '../../../../shared/components';

interface PatientTimelineProps {
  events: TimelineEvent[];
}

const eventIcons = {
  medication: '💊',
  procedure: '🏥',
  assessment: '📋',
  alert: '⚠️',
};

const eventColors = {
  medication: 'bg-blue-50 border-blue-200',
  procedure: 'bg-purple-50 border-purple-200',
  assessment: 'bg-green-50 border-green-200',
  alert: 'bg-red-50 border-red-200',
};

export const PatientTimeline = ({ events }: PatientTimelineProps) => {
  return (
    <Card title="Patient Timeline">
      {events.length === 0 ? (
        <p className="text-gray-500">No events recorded</p>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className={`p-4 rounded-lg border-l-4 ${eventColors[event.type]}`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{eventIcons[event.type]}</span>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h4 className="font-semibold text-gray-900">{event.title}</h4>
                    <span className="text-sm text-gray-500">
                      {formatDateTime(event.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mt-1">{event.description}</p>
                  <p className="text-xs text-gray-500 mt-2">By: {event.createdBy}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
