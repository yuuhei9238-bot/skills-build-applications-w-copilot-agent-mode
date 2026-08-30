import { useEffect, useState } from 'react';

const activityEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities`
  : 'http://localhost:8000/api/activities';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    fetch(activityEndpoint)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Unable to load activities.');
        }

        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.data || [];

        if (active) {
          setActivities(data);
        }
      })
      .catch((err) => {
        if (active) {
          setError(err.message || 'Unable to load activities.');
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading activities...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Activities</h2>
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Type</th>
                <th>Minutes</th>
                <th>Date</th>
                <th>Calories</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id || activity.id}>
                  <td>{activity.type}</td>
                  <td>{activity.minutes}</td>
                  <td>{activity.date}</td>
                  <td>{activity.calories ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
