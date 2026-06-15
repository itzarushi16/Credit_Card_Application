import React, { useState } from 'react';

const CreditCardMock = ({ cardHolder = 'YOUR NAME', status = 'APPROVED', monthlyIncome = 50000 }) => {
  const [flipped, setFlipped] = useState(false);

  // Generate a mock credit limit (5 times the monthly income, capped at 10L, minimum 1.5L)
  const creditLimit = Math.max(150000, Math.min(1000000, Math.round(monthlyIncome * 5)));
  const formattedLimit = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(creditLimit);

  // Format cardholder name to uppercase
  const displayName = cardHolder.trim().toUpperCase() || 'VALUED CUSTOMER';

  // Determine card style based on status
  let cardClass = '';
  let tierName = 'PLATINUM';
  if (status === 'APPROVED') {
    cardClass = 'cc-status-approved';
    tierName = creditLimit >= 500000 ? 'APEX ELITE' : 'PLATINUM SELECT';
  } else if (status === 'REJECTED') {
    tierName = 'INACTIVE';
  } else if (status === 'MANUAL_REVIEW') {
    tierName = 'UNDER REVIEW';
  } else {
    tierName = 'PENDING VALIDATION';
  }

  const handleCardClick = () => {
    setFlipped(!flipped);
  };

  return (
    <div className="cc-container" onClick={handleCardClick}>
      <div className={`cc-card ${flipped ? 'flipped' : ''}`}>
        
        {/* FRONT FACE */}
        <div className={`cc-face cc-front ${cardClass} glass`}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 2 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '0.05em', color: '#ffffff' }}>
                APEX<span style={{ color: 'var(--color-primary)' }}>CARD</span>
              </div>
              <div style={{ fontSize: '0.55rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', marginTop: '2px', fontWeight: 700 }}>
                {tierName}
              </div>
            </div>
            
            {/* Wireless symbol and card vendor mock */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12a7 7 0 0 1 14 0" />
                <path d="M8.5 15.5a3.5 3.5 0 0 1 7 0" />
                <path d="M12 18h.01" />
              </svg>
              <div style={{ width: '28px', height: '18px', borderRadius: '4px', background: 'rgba(255,255,255,0.15)', display: 'flex' }} />
            </div>
          </div>

          {/* Chip component */}
          <div style={{ 
            width: '40px', 
            height: '32px', 
            borderRadius: '6px', 
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', 
            boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.3)',
            position: 'relative',
            zIndex: 2,
            marginTop: '8px'
          }}>
            {/* Inner chip circuits pattern */}
            <div style={{ position: 'absolute', top: '15%', left: '15%', right: '15%', bottom: '15%', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '3px' }} />
            <div style={{ position: 'absolute', top: '0', left: '50%', width: '1px', height: '100%', background: 'rgba(0,0,0,0.15)' }} />
            <div style={{ position: 'absolute', left: '0', top: '50%', height: '1px', width: '100%', background: 'rgba(0,0,0,0.15)' }} />
          </div>

          {/* Card Number */}
          <div style={{ 
            fontFamily: 'Courier New, Courier, monospace', 
            fontWeight: 'bold', 
            fontSize: '1.35rem', 
            letterSpacing: '3px', 
            color: '#ffffff',
            textShadow: '1px 2px 4px rgba(0,0,0,0.8)',
            zIndex: 2,
            marginTop: '12px'
          }}>
            {status === 'APPROVED' ? '4532 8801 3345 9182' : '•••• •••• •••• ••••'}
          </div>

          {/* Holder Name & Expiry */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', zIndex: 2 }}>
            <div style={{ maxWidth: '70%' }}>
              <div style={{ fontSize: '0.55rem', color: 'var(--text-secondary)', letterSpacing: '0.05em', fontWeight: 600 }}>CARDHOLDER</div>
              <div style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {displayName}
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '0.55rem', color: 'var(--text-secondary)', letterSpacing: '0.05em', fontWeight: 600 }}>EXPIRES</div>
                <div style={{ fontSize: '0.8rem', color: '#ffffff', fontWeight: 700, fontFamily: 'Courier New' }}>06/31</div>
              </div>
              
              {status === 'APPROVED' && (
                <div>
                  <div style={{ fontSize: '0.55rem', color: 'var(--text-secondary)', letterSpacing: '0.05em', fontWeight: 600 }}>LIMIT</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-success)', fontWeight: 700 }}>{formattedLimit}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* BACK FACE */}
        <div className="cc-face cc-back glass">
          {/* Black magnetic strip */}
          <div style={{ width: '100%', height: '38px', background: '#000000', margin: '4px 0 12px 0' }} />
          
          {/* Signature panel and CVV */}
          <div style={{ padding: '0 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ 
              flex: 1, 
              height: '32px', 
              background: 'rgba(255,255,255,0.8)', 
              borderRadius: '4px',
              fontFamily: 'cursive', 
              color: '#374151',
              paddingLeft: '12px',
              display: 'flex',
              alignItems: 'center',
              fontSize: '0.9rem'
            }}>
              {displayName.toLowerCase()}
            </div>
            
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.5rem', color: 'var(--text-secondary)', letterSpacing: '0.05em', fontWeight: 600, marginBottom: '2px' }}>CVV</div>
              <div style={{ 
                background: '#ffffff', 
                color: '#111827', 
                padding: '4px 10px', 
                borderRadius: '4px', 
                fontSize: '0.85rem', 
                fontWeight: 'bold',
                fontFamily: 'Courier New'
              }}>
                {status === 'APPROVED' ? '418' : '•••'}
              </div>
            </div>
          </div>

          <div style={{ padding: '0 24px', marginTop: '16px', fontSize: '0.5rem', color: 'rgba(255,255,255,0.3)', lineHeight: '1.4' }}>
            This card is mock property of Apex Bank. If found, please dispose of properly. Used solely for demonstration of Credit Eligibility Systems.
          </div>
        </div>

      </div>
    </div>
  );
};

export default CreditCardMock;
