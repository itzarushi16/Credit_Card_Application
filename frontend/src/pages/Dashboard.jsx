import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If admin, navigate to admin dashboard automatically
    if (isAdmin) {
      navigate('/admin');
      return;
    }

    const fetchApplications = async () => {
      try {
        const response = await API.get('/applications/my');
        setApplications(response.data);
      } catch (err) {
        console.error("Error fetching applications:", err);
        setError("Could not load applications. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [isAdmin, navigate]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'APPROVED':
        return <span className="badge badge-approved">Approved</span>;
      case 'REJECTED':
        return <span className="badge badge-rejected">Rejected</span>;
      case 'MANUAL_REVIEW':
        return <span className="badge badge-manual">Under Review</span>;
      case 'PENDING':
        return <span className="badge badge-pending">Document Pending</span>;
      default:
        return <span className="badge">{status}</span>;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Loading dashboard portal data...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '0 24px 40px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Header section with stats */}
      <div className="glass" style={{ padding: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700 }}>
            Welcome back, {user?.firstName}!
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
            Manage your credentials and track your credit card applications in real-time.
          </p>
        </div>
        
        <div>
          <Link to="/apply" className="btn btn-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Apply for Credit Card
          </Link>
        </div>
      </div>

      {/* Main content grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
        <div className="glass" style={{ padding: '32px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, marginBottom: '24px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '12px' }}>
            Application History
          </h3>

          {error && (
            <div style={{ background: 'var(--color-danger-glow)', color: '#f87171', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px' }}>
              {error}
            </div>
          )}

          {applications.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-secondary)' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" style={{ marginBottom: '16px' }}>
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
              <p style={{ fontWeight: 500 }}>No applications found.</p>
              <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>Submit your first card application to see it here.</p>
              <Link to="/apply" className="btn btn-secondary" style={{ marginTop: '20px' }}>Apply Now</Link>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid rgba(255, 255, 255, 0.08)', color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <th style={{ padding: '12px 16px' }}>Application ID</th>
                    <th style={{ padding: '12px 16px' }}>PAN</th>
                    <th style={{ padding: '12px 16px' }}>Income</th>
                    <th style={{ padding: '12px 16px' }}>CIBIL Score</th>
                    <th style={{ padding: '12px 16px' }}>Date Applied</th>
                    <th style={{ padding: '12px 16px' }}>Status</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app.id} className="glass-interactive" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', fontSize: '0.95rem', transition: 'background-color 0.2s' }}>
                      <td style={{ padding: '16px', fontWeight: 'bold' }}>#{app.id}</td>
                      <td style={{ padding: '16px', fontFamily: 'Courier New', fontWeight: 600 }}>{app.pan}</td>
                      <td style={{ padding: '16px' }}>₹{app.monthlyIncome.toLocaleString('en-IN')}</td>
                      <td style={{ padding: '16px', fontWeight: 600 }}>{app.cibilScore}</td>
                      <td style={{ padding: '16px' }}>{formatDate(app.createdAt)}</td>
                      <td style={{ padding: '16px' }}>{getStatusBadge(app.status)}</td>
                      <td style={{ padding: '16px', textAlign: 'right' }}>
                        <Link to={`/applications/${app.id}`} className="btn btn-secondary" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
