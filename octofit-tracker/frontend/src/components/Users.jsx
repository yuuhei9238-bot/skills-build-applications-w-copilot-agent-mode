import { useEffect, useState } from 'react';
import { fetchCollection } from './api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    fetchCollection('users')
      .then((data) => {
        if (active) {
          setUsers(data);
        }
      })
      .catch((err) => {
        if (active) {
          setError(err.message || 'Unable to load users.');
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
    return <div className="alert alert-info">Loading users...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Users</h2>
        <div className="row g-3">
          {users.map((user) => (
            <div key={user._id || user.id || user.email} className="col-md-6 col-xl-4">
              <div className="border rounded p-3 h-100">
                <h3 className="h5 mb-2">{user.name}</h3>
                <p className="mb-1"><strong>Email:</strong> {user.email}</p>
                <p className="mb-1"><strong>Team:</strong> {user.team}</p>
                <p className="mb-0"><strong>Fitness level:</strong> {user.fitnessLevel || 'Not set'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
