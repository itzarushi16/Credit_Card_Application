import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';
import CreditCardMock from '../components/CreditCardMock';

const ApplicationDetails = () => {
  const { id } = useParams();
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await API.get(`/applications/${id}`);
        setApp(response.data);
      } catch (err) {
        console.error("Error loading details:", err);
        setError("Could not load application details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const getStatusDetails = (status) => {
    switch (status) {
      case 'APPROVED':
        return {
          color: 'var(--color-success)',
          bg: 'var(--color-success-glow)',
          label: 'Application Approved',
          description: 'Congratulations! Your credit profile meets all bank parameters. Your virtual credit card is active below.'
        };
      case 'REJECTED':
        return {
          color: 'var(--color-danger)',
          bg: 'var(--color-danger-glow)',
          label: 'Application Rejected',
          description: 'We regret to inform you that your application could not be approved at this time.'
        };
      case 'MANUAL_REVIEW':
        return {
          color: 'var(--color-warning)',
          bg: 'var(--color-warning-glow)',
          label: 'Pending Manual Review',
          description: 'Your application has been flagged for manual verification by a credit underwriter.'
        };
      case 'PENDING':
        return {
          color: 'var(--color-info)',
          bg: 'var(--color-info-glow)',
          label: 'Pending Documents',
          description: 'We require additional documentation to complete the assessment of your profile.'
        };
      default:
        return { color: '#ffffff', bg: 'rgba(255,255,255,0.05)', label: status, description: '' };
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Retrieving application records...</p>
      </div>
    );
  }

  if (error || !app) {
    return (
      <div style={{ padding: '24px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <div className="glass" style={{ padding: '32px' }}>
          <p style={{ color: 'var(--color-danger)', fontWeight: 'bold' }}>{error || "Application not found."}</p>
          <Link to="/dashboard" className="btn btn-secondary" style={{ marginTop: '20px' }}>Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusDetails(app.status);
  
  // Calculate Debt to income
  const dti = Math.round((app.monthlyDebtObligations / app.monthlyIncome) * 100);

  return (
    <div style={{ padding: '0 24px 40px 24px', maxWidth: '1000px', margin: '0 auto' }}>
      
      <div style={{ marginBottom: '24px' }}>
        <Link to="/dashboard" style={{ textDecoration: 'none', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', fontWeight: 600 }}>
          ← Back to Dashboard
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
        
        {/* LEFT PANEL: DECISION AND CARD PREVIEW */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* Decision Card */}
          <div className="glass" style={{ padding: '32px', borderLeft: `4px solid ${statusInfo.color}` }}>
            <span style={{ 
              display: 'inline-block', 
              padding: '4px 10px', 
              borderRadius: '6px', 
              fontSize: '0.75rem', 
              fontWeight: 700, 
              background: statusInfo.bg, 
              color: statusInfo.color,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '16px'
            }}>
              {app.status}
            </span>
            
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px' }}>
              {statusInfo.label}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '20px' }}>
              {statusInfo.description}
            </p>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px 20px', borderRadius: '10px', border: '1px dashed rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                System Decision Message
              </div>
              <div style={{ fontSize: '0.95rem', color: '#ffffff', fontWeight: 600, marginTop: '6px', lineHeight: '1.4' }}>
                "{app.decisionMessage || 'No notes left by system.'}"
              </div>
            </div>
          </div>

          {/* Virtual Card Preview (Only render card mockup if status is Approved or Manual Review or Pending) */}
          <div className="glass" style={{ padding: '32px', textAlign: 'center' }}>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Virtual Credit Card Preview
            </h4>
            
            <div style={{ margin: '16px 0 24px 0' }}>
              <CreditCardMock 
                cardHolder={app.fullName} 
                status={app.status} 
                monthlyIncome={app.monthlyIncome} 
              />
            </div>
            
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              {app.status === 'APPROVED' ? '💡 Click the card to flip and view signature/CVV' : '💡 Card will activate upon application approval.'}
            </span>
          </div>

        </div>

        {/* RIGHT PANEL: APPLICATION DETAILS PROFILE */}
        <div className="glass" style={{ padding: '32px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, marginBottom: '24px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '12px' }}>
            Submitted Profile
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Identity details */}
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '8px' }}>
                Identity Profile
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '0.9rem' }}>
                <div>
                  <span style={{ color: 'var(--text-secondary)' }}>Full Name:</span>
                  <div style={{ color: '#ffffff', fontWeight: 600, marginTop: '2px' }}>{app.fullName}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-secondary)' }}>Phone:</span>
                  <div style={{ color: '#ffffff', fontWeight: 600, marginTop: '2px' }}>{app.phoneNumber}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-secondary)' }}>PAN Card:</span>
                  <div style={{ color: '#ffffff', fontWeight: 600, marginTop: '2px', fontFamily: 'Courier New' }}>{app.pan}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-secondary)' }}>Aadhaar:</span>
                  <div style={{ color: '#ffffff', fontWeight: 600, marginTop: '2px', fontFamily: 'Courier New' }}>{app.aadhaar}</div>
                </div>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }} />

            {/* Income & employment */}
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '8px' }}>
                Employment & Assets
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '0.9rem' }}>
                <div>
                  <span style={{ color: 'var(--text-secondary)' }}>Employment Type:</span>
                  <div style={{ color: '#ffffff', fontWeight: 600, marginTop: '2px' }}>{app.employmentType}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-secondary)' }}>Monthly Income:</span>
                  <div style={{ color: '#ffffff', fontWeight: 600, marginTop: '2px' }}>₹{app.monthlyIncome.toLocaleString('en-IN')}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-secondary)' }}>Duration:</span>
                  <div style={{ color: '#ffffff', fontWeight: 600, marginTop: '2px' }}>{app.employmentDurationMonths} Months</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-secondary)' }}>Salary Proof:</span>
                  <div style={{ color: app.salaryProofProvided ? 'var(--color-success)' : 'var(--color-danger)', fontWeight: 600, marginTop: '2px' }}>
                    {app.salaryProofProvided ? 'Verified/Submitted' : 'Not Submitted'}
                  </div>
                </div>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }} />

            {/* Credit risk metrics */}
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '8px' }}>
                Credit Bureau Metrics
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '0.9rem' }}>
                <div>
                  <span style={{ color: 'var(--text-secondary)' }}>CIBIL Score:</span>
                  <div style={{ color: app.cibilScore >= 750 ? 'var(--color-success)' : app.cibilScore >= 650 ? 'var(--color-warning)' : 'var(--color-danger)', fontWeight: 700, marginTop: '2px' }}>
                    {app.cibilScore}
                  </div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-secondary)' }}>Existing Debt Exposure:</span>
                  <div style={{ color: '#ffffff', fontWeight: 600, marginTop: '2px' }}>₹{app.existingLoanExposure.toLocaleString('en-IN')}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-secondary)' }}>Card Utilization:</span>
                  <div style={{ color: app.creditCardUtilization > 80 ? 'var(--color-warning)' : '#ffffff', fontWeight: 600, marginTop: '2px' }}>
                    {app.creditCardUtilization}%
                  </div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-secondary)' }}>Debt to Income (DTI):</span>
                  <div style={{ color: dti > 50 ? 'var(--color-warning)' : '#ffffff', fontWeight: 600, marginTop: '2px' }}>
                    {dti}%
                  </div>
                </div>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }} />

            {/* Residency address */}
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Address & Location</span>
              <div style={{ fontSize: '0.9rem', color: '#ffffff', marginTop: '6px', lineHeight: '1.4' }}>
                {app.address}, PIN: {app.pincode}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ApplicationDetails;
