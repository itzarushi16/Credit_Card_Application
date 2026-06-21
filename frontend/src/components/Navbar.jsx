import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="glass" style={{ margin: '16px 24px', padding: '16px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ 
          width: '34px', 
          height: '34px', 
          borderRadius: '8px', 
          background: 'var(--color-primary)', 
          border: '2px solid var(--border-card)',
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          fontWeight: 'bold', 
          fontSize: '1.2rem',
          color: 'var(--border-card)'
        }}>
          Λ
        </div>
        <Link to="/dashboard" style={{ textDecoration: 'none', color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.35rem', letterSpacing: '0.05em' }}>
          APEX<span style={{ color: '#4F46E5' }}>CARD</span>
        </Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <Link to="/dashboard" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontWeight: 700, transition: 'color 0.15s' }} onMouseOver={(e) => e.target.style.color = '#4F46E5'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>
          Dashboard
        </Link>

        {!isAdmin ? (
          <Link to="/apply" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontWeight: 700, transition: 'color 0.15s' }} onMouseOver={(e) => e.target.style.color = '#4F46E5'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>
            Apply for Card
          </Link>
        ) : (
          <Link to="/admin" style={{ textDecoration: 'none', color: 'var(--text-primary)', fontWeight: 800, transition: 'color 0.15s' }} onMouseOver={(e) => e.target.style.color = '#4F46E5'} onMouseOut={(e) => e.target.style.color = 'var(--text-primary)'}>
            Admin Panel
          </Link>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderLeft: '2px solid #E2E8F0', paddingLeft: '24px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {user.username}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 800 }}>
              {isAdmin ? 'Administrator' : 'Card Member'}
            </div>
          </div>
          <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '6px 14px', fontSize: '0.8rem', background: '#FFFFFF' }}>
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
