import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const navItems = [
  { to: '/', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  return (
    <div className="container py-4">
      <div className="alert alert-light border mb-4">
        <strong>API base:</strong>{' '}
        {codespaceName
          ? `https://${codespaceName}-8000.app.github.dev/api`
          : 'http://localhost:8000/api'}
      </div>

      <div className="alert alert-warning small mb-4" role="alert">
        Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for Codespaces. If it is unset, the app falls back to the localhost API.
      </div>

      <nav className="navbar navbar-expand-lg navbar-light bg-white rounded shadow-sm mb-4 px-3">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Octofit Tracker</span>
          <div className="navbar-nav flex-row gap-2 flex-wrap">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `nav-link btn btn-sm ${isActive ? 'btn-primary text-white' : 'btn-outline-primary'}`}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;
