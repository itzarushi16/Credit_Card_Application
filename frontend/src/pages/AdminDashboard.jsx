import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Workstation review dialog state
  const [reviewId, setReviewId] = useState(null);
  const [reviewStatus, setReviewStatus] = useState('APPROVED');
  const [decisionMessage, setDecisionMessage] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  const fetchAllApplications = async () => {
    try {
      const response = await API.get('/applications/admin/all');
      setApplications(response.data);
      setFilteredApps(response.data);
    } catch (err) {
      console.error("Admin fetch error:", err);
      setError("Failed to load applications. Make sure you are signed in as an Admin.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllApplications();
  }, []);

  useEffect(() => {
    if (filterStatus === 'ALL') {
      setFilteredApps(applications);
    } else {
      setFilteredApps(applications.filter(app => app.status === filterStatus));
    }
  }, [filterStatus, applications]);

  // Statistics calculation
  const totalCount = applications.length;
  const approvedCount = applications.filter(app => app.status === 'APPROVED').length;
  const reviewCount = applications.filter(app => app.status === 'MANUAL_REVIEW').length;
  const pendingCount = applications.filter(app => app.status === 'PENDING').length;
  const rejectedCount = applications.filter(app => app.status === 'REJECTED').length;

  const handleOpenReview = (id, defaultStatus) => {
    setReviewId(id);
    setReviewStatus(defaultStatus);
    setDecisionMessage('');
  };

  const handleCloseReview = () => {
    setReviewId(null);
  };

  const handleUpdateStatusSubmit = async (e) => {
    e.preventDefault();
    if (!reviewId) return;

    setActionLoading(true);
    try {
      await API.put(`/applications/admin/update-status/${reviewId}?status=${reviewStatus}&decisionMessage=${encodeURIComponent(decisionMessage)}`);
      // Refresh list
      await fetchAllApplications();
      setReviewId(null);
    } catch (err) {
      console.error("Error updating status:", err);
      alert(err.response?.data?.message || "Failed to update status");
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'APPROVED': return <span className="badge badge-approved">Approved</span>;
      case 'REJECTED': return <span className="badge badge-rejected">Rejected</span>;
      case 'MANUAL_REVIEW': return <span className="badge badge-manual">Under Review</span>;
      case 'PENDING': return <span className="badge badge-pending">Pending Doc</span>;
      default: return <span className="badge">{status}</span>;
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Loading administrative dashboard records...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '0 24px 40px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700 }}>
          Credit Operations Command Center
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
          Evaluate flagged risk profiles and manage credit card underwriting decisions.
        </p>
      </div>

      {error && (
        <div style={{ background: 'var(--color-danger-glow)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#f87171', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
          {error}
        </div>
      )}

      {/* STATISTICS CARDS ROW */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <div className="glass" style={{ padding: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase' }}>Total Applications</div>
          <div style={{ fontSize: '2.25rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: '#ffffff', marginTop: '6px' }}>{totalCount}</div>
        </div>
        <div className="glass" style={{ padding: '20px', textAlign: 'center', borderBottom: '3px solid var(--color-success)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase' }}>Approved</div>
          <div style={{ fontSize: '2.25rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-success)', marginTop: '6px' }}>{approvedCount}</div>
        </div>
        <div className="glass" style={{ padding: '20px', textAlign: 'center', borderBottom: '3px solid var(--color-warning)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase' }}>Manual Review</div>
          <div style={{ fontSize: '2.25rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-warning)', marginTop: '6px' }}>{reviewCount}</div>
        </div>
        <div className="glass" style={{ padding: '20px', textAlign: 'center', borderBottom: '3px solid var(--color-info)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase' }}>Pending Doc</div>
          <div style={{ fontSize: '2.25rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-info)', marginTop: '6px' }}>{pendingCount}</div>
        </div>
        <div className="glass" style={{ padding: '20px', textAlign: 'center', borderBottom: '3px solid var(--color-danger)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase' }}>Rejected</div>
          <div style={{ fontSize: '2.25rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-danger)', marginTop: '6px' }}>{rejectedCount}</div>
        </div>
      </div>

      {/* FILTER CONTROL BAR */}
      <div className="glass" style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '24px' }}>
        <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Filter Queue:</div>
        
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {['ALL', 'APPROVED', 'MANUAL_REVIEW', 'PENDING', 'REJECTED'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className="btn"
              style={{
                padding: '6px 14px',
                fontSize: '0.8rem',
                background: filterStatus === status ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.05)',
                color: '#ffffff',
                border: filterStatus === status ? 'none' : '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              {status.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* LIST TABLE */}
      <div className="glass" style={{ padding: '32px' }}>
        {filteredApps.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-secondary)' }}>
            No applications match this filter status.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(255, 255, 255, 0.08)', color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <th style={{ padding: '12px 16px' }}>ID</th>
                  <th style={{ padding: '12px 16px' }}>Applicant Name</th>
                  <th style={{ padding: '12px 16px' }}>CIBIL</th>
                  <th style={{ padding: '12px 16px' }}>Net Monthly Income</th>
                  <th style={{ padding: '12px 16px' }}>DTI</th>
                  <th style={{ padding: '12px 16px' }}>Status</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right' }}>Audit Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApps.map((app) => {
                  const dti = Math.round((app.monthlyDebtObligations / app.monthlyIncome) * 100);
                  return (
                    <tr key={app.id} className="glass-interactive" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', fontSize: '0.95rem' }}>
                      <td style={{ padding: '16px', fontWeight: 'bold' }}>#{app.id}</td>
                      <td style={{ padding: '16px' }}>
                        <div>{app.fullName}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px', fontFamily: 'Courier New' }}>PAN: {app.pan}</div>
                      </td>
                      <td style={{ padding: '16px', fontWeight: 600 }}>{app.cibilScore}</td>
                      <td style={{ padding: '16px' }}>₹{app.monthlyIncome.toLocaleString('en-IN')}</td>
                      <td style={{ padding: '16px' }}>{dti}%</td>
                      <td style={{ padding: '16px' }}>{getStatusBadge(app.status)}</td>
                      <td style={{ padding: '16px', textAlign: 'right', display: 'flex', gap: '8px', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Link to={`/applications/${app.id}`} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>
                          View File
                        </Link>
                        
                        {app.status === 'MANUAL_REVIEW' && (
                          <>
                            <button
                              onClick={() => handleOpenReview(app.id, 'APPROVED')}
                              className="btn"
                              style={{ padding: '6px 12px', fontSize: '0.75rem', background: 'var(--color-success-glow)', border: '1px solid rgba(16,185,129,0.3)', color: 'var(--color-success)' }}
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleOpenReview(app.id, 'REJECTED')}
                              className="btn"
                              style={{ padding: '6px 12px', fontSize: '0.75rem', background: 'var(--color-danger-glow)', border: '1px solid rgba(239,68,68,0.3)', color: 'var(--color-danger)' }}
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* POPUP REVIEW WORKSTATION MODAL */}
      {reviewId && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '24px' }}>
          <div className="glass" style={{ width: '100%', maxWidth: '500px', padding: '32px', borderColor: 'rgba(255, 255, 255, 0.15)' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, marginBottom: '8px' }}>
              Manual Underwriting Audit (App #{reviewId})
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '24px' }}>
              Provide a clear, formal explanation for overriding the automated rules evaluation.
            </p>

            <form onSubmit={handleUpdateStatusSubmit}>
              <div className="form-group">
                <label className="form-label">Audit Decision</label>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#ffffff' }}>
                    <input
                      type="radio"
                      name="reviewStatus"
                      value="APPROVED"
                      checked={reviewStatus === 'APPROVED'}
                      onChange={() => setReviewStatus('APPROVED')}
                      style={{ accentColor: 'var(--color-success)' }}
                    />
                    Approve Credit Card
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#ffffff' }}>
                    <input
                      type="radio"
                      name="reviewStatus"
                      value="REJECTED"
                      checked={reviewStatus === 'REJECTED'}
                      onChange={() => setReviewStatus('REJECTED')}
                      style={{ accentColor: 'var(--color-danger)' }}
                    />
                    Reject Application
                  </label>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '28px' }}>
                <label className="form-label">Decision Note / Audit Explanations *</label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Explain why this decision is made (e.g. verified income proofs manually, CIBIL verified offline, high risk mitigators exists...)"
                  value={decisionMessage}
                  onChange={(e) => setDecisionMessage(e.target.value)}
                  required
                  style={{ resize: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseReview}
                  disabled={actionLoading}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={actionLoading}
                  style={{ background: reviewStatus === 'APPROVED' ? 'linear-gradient(135deg, var(--color-success) 0%, #059669 100%)' : 'linear-gradient(135deg, var(--color-danger) 0%, #dc2626 100%)', boxShadow: 'none' }}
                >
                  {actionLoading ? 'Recording Note...' : 'Commit Audit Decision'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
