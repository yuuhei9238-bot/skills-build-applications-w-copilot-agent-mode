import { useEffect, useState } from 'react';
import { fetchCollection } from './api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    fetchCollection('workouts')
      .then((data) => {
        if (active) {
          setWorkouts(data);
        }
      })
      .catch((err) => {
        if (active) {
          setError(err.message || 'Unable to load workouts.');
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
    return <div className="alert alert-info">Loading workouts...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Workouts</h2>
        <div className="row g-3">
          {workouts.map((workout) => (
            <div key={workout._id || workout.id || workout.title} className="col-md-6 col-xl-4">
              <div className="border rounded p-3 h-100">
                <h3 className="h5 mb-2">{workout.title}</h3>
                <p className="mb-1"><strong>Level:</strong> {workout.level}</p>
                <p className="mb-1"><strong>Duration:</strong> {workout.duration} min</p>
                <p className="mb-0"><strong>Focus:</strong> {workout.focus || 'General fitness'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
