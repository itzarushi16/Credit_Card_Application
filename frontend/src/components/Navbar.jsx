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
    <nav className="glass" style={{ margin: '16px 24px', padding: '16px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, var(--color-primary) 0%, #10b981 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '1.1rem' }}>
          Λ
        </div>
        <Link to="/dashboard" style={{ textDecoration: 'none', color: '#ffffff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', letterSpacing: '0.05em' }}>
          APEX<span style={{ color: 'var(--color-primary)' }}>CARD</span>
        </Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <Link to="/dashboard" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontWeight: 600, transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#ffffff'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>
          Dashboard
        </Link>

        {!isAdmin ? (
          <Link to="/apply" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontWeight: 600, transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#ffffff'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>
            Apply for Card
          </Link>
        ) : (
          <Link to="/admin" style={{ textDecoration: 'none', color: 'var(--color-warning)', fontWeight: 600, transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#ffffff'} onMouseOut={(e) => e.target.style.color = 'var(--color-warning)'}>
            Admin Panel
          </Link>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderLeft: '1px solid rgba(255, 255, 255, 0.1)', paddingLeft: '24px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ffffff' }}>
              {user.username}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
              {isAdmin ? 'Administrator' : 'Card Member'}
            </div>
          </div>
          <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
