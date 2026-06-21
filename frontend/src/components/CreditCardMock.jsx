import React, { useState } from 'react';

const CreditCardMock = ({ cardHolder = 'YOUR NAME', status = 'APPROVED', monthlyIncome = 50000, cardNumber }) => {
  const [flipped, setFlipped] = useState(false);

  const creditLimit = Math.max(150000, Math.min(1000000, Math.round(monthlyIncome * 5)));
  const formattedLimit = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(creditLimit);

  const displayName = cardHolder.trim().toUpperCase() || 'VALUED CUSTOMER';

  const formatCardNumber = (num) => {
    if (!num) return '•••• •••• •••• ••••';
    // Remove non-digits and insert space every 4 digits
    return num.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const displayCardNumber = status === 'APPROVED' 
    ? formatCardNumber(cardNumber || '4532987654321098') 
    : '•••• •••• •••• ••••';

  let cardBg = 'linear-gradient(135deg, #E0E7FF 0%, #C7D2FE 100%)'; // Pastel indigo/lavender (Approved)
  let borderStroke = '#1E293B';
  let tierName = 'PLATINUM';
  let textColor = '#1E293B';
  let secondaryTextColor = '#475569';

  if (status === 'APPROVED') {
    tierName = creditLimit >= 500000 ? 'APEX ELITE' : 'PLATINUM SELECT';
    cardBg = 'linear-gradient(135deg, #E0E7FF 0%, #C7D2FE 100%)'; // Soft Pastel Indigo
  } else if (status === 'REJECTED') {
    tierName = 'INACTIVE';
    cardBg = 'linear-gradient(135deg, #FEE2E2 0%, #FCA5A5 100%)'; // Soft Pastel Coral Red
  } else if (status === 'MANUAL_REVIEW') {
    tierName = 'UNDER REVIEW';
    cardBg = 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)'; // Soft Pastel Gold/Yellow
  } else {
    tierName = 'PENDING';
    cardBg = 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)'; // Soft Pastel Baby Blue
  }

  const handleCardClick = () => {
    setFlipped(!flipped);
  };

  return (
    <div className="cc-container" onClick={handleCardClick} style={{ perspective: '1000px', cursor: 'pointer' }}>
      <div className={`cc-card ${flipped ? 'flipped' : ''}`} style={{ 
        width: '100%', 
        height: '100%', 
        position: 'relative', 
        transformStyle: 'preserve-3d', 
        transition: 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        borderRadius: '16px'
      }}>
        
        {/* FRONT FACE */}
        <div className="cc-face cc-front" style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          borderRadius: '16px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: cardBg,
          border: '3px solid #1E293B',
          boxShadow: '4px 4px 0px #1E293B',
          color: textColor,
          overflow: 'hidden'
        }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 2 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '0.05em', color: '#1E293B' }}>
                APEX<span style={{ color: '#4F46E5' }}>CARD</span>
              </div>
              <div style={{ fontSize: '0.6rem', letterSpacing: '0.12em', color: secondaryTextColor, marginTop: '2px', fontWeight: 800 }}>
                {tierName}
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12a7 7 0 0 1 14 0" />
                <path d="M8.5 15.5a3.5 3.5 0 0 1 7 0" />
                <path d="M12 18h.01" />
              </svg>
              <div style={{ width: '28px', height: '18px', borderRadius: '4px', border: '2px solid #1E293B', background: '#FFFFFF' }} />
            </div>
          </div>

          {/* Chip component */}
          <div style={{ 
            width: '38px', 
            height: '28px', 
            borderRadius: '6px', 
            background: '#FCD34D', 
            border: '2.5px solid #1E293B',
            position: 'relative',
            zIndex: 2,
            marginTop: '4px'
          }}>
            <div style={{ position: 'absolute', top: '15%', left: '15%', right: '15%', bottom: '15%', border: '1px solid #1E293B', borderRadius: '2px' }} />
          </div>

          {/* Card Number */}
          <div style={{ 
            fontFamily: 'Courier New, Courier, monospace', 
            fontWeight: 900, 
            fontSize: '1.4rem', 
            letterSpacing: '2px', 
            color: '#1E293B',
            zIndex: 2,
            marginTop: '8px'
          }}>
            {displayCardNumber}
          </div>

          {/* Holder Name & Expiry */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', zIndex: 2 }}>
            <div style={{ maxWidth: '65%' }}>
              <div style={{ fontSize: '0.55rem', color: secondaryTextColor, letterSpacing: '0.05em', fontWeight: 800 }}>CARDHOLDER</div>
              <div style={{ fontSize: '0.85rem', color: '#1E293B', fontWeight: 800, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {displayName}
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '0.55rem', color: secondaryTextColor, letterSpacing: '0.05em', fontWeight: 800 }}>EXPIRES</div>
                <div style={{ fontSize: '0.8rem', color: '#1E293B', fontWeight: 800, fontFamily: 'Courier New' }}>06/31</div>
              </div>
              
              {status === 'APPROVED' && (
                <div>
                  <div style={{ fontSize: '0.55rem', color: secondaryTextColor, letterSpacing: '0.05em', fontWeight: 800 }}>LIMIT</div>
                  <div style={{ fontSize: '0.8rem', color: '#065F46', fontWeight: 900 }}>{formattedLimit}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* BACK FACE */}
        <div className="cc-face cc-back" style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          borderRadius: '16px',
          padding: '24px 0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: cardBg,
          border: '3px solid #1E293B',
          boxShadow: '4px 4px 0px #1E293B',
          transform: 'rotateY(180deg)',
          overflow: 'hidden'
        }}>
          {/* Black magnetic strip */}
          <div style={{ width: '100%', height: '36px', background: '#1E293B', margin: '4px 0 10px 0' }} />
          
          {/* Signature panel and CVV */}
          <div style={{ padding: '0 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ 
              flex: 1, 
              height: '30px', 
              background: '#FFFFFF', 
              border: '2.5px solid #1E293B',
              borderRadius: '4px',
              fontFamily: 'cursive', 
              color: '#1E293B',
              paddingLeft: '12px',
              display: 'flex',
              alignItems: 'center',
              fontSize: '0.85rem',
              fontWeight: 'bold'
            }}>
              {displayName.toLowerCase()}
            </div>
            
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.5rem', color: secondaryTextColor, letterSpacing: '0.05em', fontWeight: 800, marginBottom: '2px' }}>CVV</div>
              <div style={{ 
                background: '#FFFFFF', 
                color: '#1E293B', 
                border: '2px solid #1E293B',
                padding: '3px 8px', 
                borderRadius: '4px', 
                fontSize: '0.8rem', 
                fontWeight: 900,
                fontFamily: 'Courier New'
              }}>
                {status === 'APPROVED' ? '418' : '•••'}
              </div>
            </div>
          </div>

          <div style={{ padding: '0 24px', marginTop: '12px', fontSize: '0.5rem', color: secondaryTextColor, lineHeight: '1.4', fontWeight: 600 }}>
            This card is mock property of Apex Bank. If found, please dispose of properly. Used solely for demonstration of Credit Eligibility Systems.
          </div>
        </div>

      </div>
    </div>
  );
};

export default CreditCardMock;
