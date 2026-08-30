import { useEffect, useState } from 'react';

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard`
  : 'http://localhost:8000/api/leaderboard';

export default function Leaderboard() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    fetch(leaderboardEndpoint)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Unable to load leaderboard.');
        }

        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.data || [];

        if (active) {
          setScores(data);
        }
      })
      .catch((err) => {
        if (active) {
          setError(err.message || 'Unable to load leaderboard.');
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
    return <div className="alert alert-info">Loading leaderboard...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Leaderboard</h2>
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Points</th>
                <th>Streak</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((entry) => (
                <tr key={entry._id || entry.id || entry.username}>
                  <td>#{entry.rank ?? 1}</td>
                  <td>{entry.username}</td>
                  <td>{entry.points}</td>
                  <td>{entry.streak ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
