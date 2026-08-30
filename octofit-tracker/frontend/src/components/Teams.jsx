import { useEffect, useState } from 'react';
import { fetchCollection } from './api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    fetchCollection('teams')
      .then((data) => {
        if (active) {
          setTeams(data);
        }
      })
      .catch((err) => {
        if (active) {
          setError(err.message || 'Unable to load teams.');
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
    return <div className="alert alert-info">Loading teams...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Teams</h2>
        <div className="row g-3">
          {teams.map((team) => (
            <div key={team._id || team.id || team.name} className="col-md-6 col-xl-4">
              <div className="border rounded p-3 h-100">
                <h3 className="h5 mb-2">{team.name}</h3>
                <p className="mb-1"><strong>Members:</strong> {team.members}</p>
                <p className="mb-0"><strong>Goal:</strong> {team.goal}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
