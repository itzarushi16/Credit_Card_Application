import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    pan: '',
    aadhaar: '',
    address: '',
    pincode: '',
    monthlyIncome: '',
    employmentDurationMonths: '',
    employmentType: 'SALARIED',
    cibilScore: 750,
    existingLoanExposure: '',
    creditCardUtilization: '',
    monthlyDebtObligations: '',
    salaryProofProvided: false
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear specific error on input change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone Number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone Number must be exactly 10 digits';
    }

    if (!formData.pan.trim()) {
      newErrors.pan = 'PAN is required';
    } else if (!/^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/.test(formData.pan)) {
      newErrors.pan = 'Invalid PAN format. Ex: ABCDE1234F';
    }

    if (!formData.aadhaar.trim()) {
      newErrors.aadhaar = 'Aadhaar is required';
    } else if (!/^[0-9]{12}$/.test(formData.aadhaar)) {
      newErrors.aadhaar = 'Aadhaar must be exactly 12 digits';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    } else if (formData.address.trim().length < 10) {
      newErrors.address = 'Address must be at least 10 characters';
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^[0-9]{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be exactly 6 digits';
    }

    if (formData.monthlyIncome === '' || Number(formData.monthlyIncome) < 0) {
      newErrors.monthlyIncome = 'Monthly Income cannot be negative';
    }

    if (formData.employmentDurationMonths === '' || Number(formData.employmentDurationMonths) < 0) {
      newErrors.employmentDurationMonths = 'Employment Duration cannot be negative';
    }

    if (formData.existingLoanExposure === '' || Number(formData.existingLoanExposure) < 0) {
      newErrors.existingLoanExposure = 'Loan Exposure cannot be negative';
    }

    if (formData.creditCardUtilization === '' || Number(formData.creditCardUtilization) < 0 || Number(formData.creditCardUtilization) > 100) {
      newErrors.creditCardUtilization = 'Utilization must be between 0% and 100%';
    }

    if (formData.monthlyDebtObligations === '' || Number(formData.monthlyDebtObligations) < 0) {
      newErrors.monthlyDebtObligations = 'Debt Obligations cannot be negative';
    }

    const cibil = Number(formData.cibilScore);
    if (!cibil || cibil < 300 || cibil > 900) {
      newErrors.cibilScore = 'CIBIL Score must be between 300 and 900';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // Normalize values to numbers
      const payload = {
        ...formData,
        monthlyIncome: parseFloat(formData.monthlyIncome),
        employmentDurationMonths: parseInt(formData.employmentDurationMonths),
        cibilScore: parseInt(formData.cibilScore),
        existingLoanExposure: parseFloat(formData.existingLoanExposure),
        creditCardUtilization: parseFloat(formData.creditCardUtilization),
        monthlyDebtObligations: parseFloat(formData.monthlyDebtObligations)
      };

      const response = await API.post('/applications/apply', payload);
      const app = response.data;
      navigate(`/applications/${app.id}`);
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitError(err.response?.data?.message || "An error occurred while processing your application. Please check input parameters.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '0 24px 40px 24px', maxWidth: '850px', margin: '0 auto' }}>
      
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700 }}>
          Credit Card Application Form
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
          Please complete all sections carefully. The eligibility engine will evaluate your submission in real-time.
        </p>
      </div>

      {submitError && (
        <div style={{ background: 'var(--color-danger-glow)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#f87171', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
          <strong>Application Denied:</strong> {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        
        {/* SECTION 1: IDENTITY & RESIDENCY */}
        <div className="glass" style={{ padding: '32px', marginBottom: '32px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '24px' }}>
            1. Identity & Residency Verification
          </h3>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                name="fullName"
                className="form-control"
                placeholder="Enter name as on PAN card"
                value={formData.fullName}
                onChange={handleChange}
                disabled={loading}
              />
              {errors.fullName && <div style={{ color: 'var(--color-danger)', fontSize: '0.75rem', marginTop: '4px' }}>{errors.fullName}</div>}
            </div>
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="user@example.com"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />
              {errors.email && <div style={{ color: 'var(--color-danger)', fontSize: '0.75rem', marginTop: '4px' }}>{errors.email}</div>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Phone Number *</label>
              <input
                type="text"
                name="phoneNumber"
                className="form-control"
                placeholder="10-digit mobile number"
                value={formData.phoneNumber}
                onChange={handleChange}
                disabled={loading}
              />
              {errors.phoneNumber && <div style={{ color: 'var(--color-danger)', fontSize: '0.75rem', marginTop: '4px' }}>{errors.phoneNumber}</div>}
            </div>
            <div className="form-group">
              <label className="form-label">PAN Card *</label>
              <input
                type="text"
                name="pan"
                className="form-control"
                placeholder="5 letters, 4 digits, 1 letter (e.g. ABCDE1234F)"
                value={formData.pan}
                onChange={handleChange}
                disabled={loading}
                style={{ textTransform: 'uppercase' }}
              />
              <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block', marginTop: '4px' }}>
                Note: 5th character should match the first letter of your surname.
              </span>
              {errors.pan && <div style={{ color: 'var(--color-danger)', fontSize: '0.75rem', marginTop: '4px' }}>{errors.pan}</div>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Aadhaar Card *</label>
              <input
                type="text"
                name="aadhaar"
                className="form-control"
                placeholder="12-digit number"
                value={formData.aadhaar}
                onChange={handleChange}
                disabled={loading}
              />
              {errors.aadhaar && <div style={{ color: 'var(--color-danger)', fontSize: '0.75rem', marginTop: '4px' }}>{errors.aadhaar}</div>}
            </div>
            <div className="form-group">
              <label className="form-label">Pincode *</label>
              <input
                type="text"
                name="pincode"
                className="form-control"
                placeholder="6-digit Indian PIN"
                value={formData.pincode}
                onChange={handleChange}
                disabled={loading}
              />
              {errors.pincode && <div style={{ color: 'var(--color-danger)', fontSize: '0.75rem', marginTop: '4px' }}>{errors.pincode}</div>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Residential Address *</label>
            <textarea
              name="address"
              className="form-control"
              placeholder="Full physical address (min 10 characters)"
              rows="3"
              value={formData.address}
              onChange={handleChange}
              disabled={loading}
              style={{ resize: 'none' }}
            />
            {errors.address && <div style={{ color: 'var(--color-danger)', fontSize: '0.75rem', marginTop: '4px' }}>{errors.address}</div>}
          </div>
        </div>

        {/* SECTION 2: INCOME & EMPLOYMENT */}
        <div className="glass" style={{ padding: '32px', marginBottom: '32px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '24px' }}>
            2. Income & Employment Status
          </h3>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Employment Type *</label>
              <select
                name="employmentType"
                className="form-control"
                value={formData.employmentType}
                onChange={handleChange}
                disabled={loading}
                style={{ background: '#0e1424' }}
              >
                <option value="SALARIED">Salaried Employee</option>
                <option value="SELF_EMPLOYED">Self Employed / business</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Monthly Net Income (INR) *</label>
              <input
                type="number"
                name="monthlyIncome"
                className="form-control"
                placeholder="Minimum required: ₹25,000"
                value={formData.monthlyIncome}
                onChange={handleChange}
                disabled={loading}
              />
              {errors.monthlyIncome && <div style={{ color: 'var(--color-danger)', fontSize: '0.75rem', marginTop: '4px' }}>{errors.monthlyIncome}</div>}
            </div>
          </div>

          <div className="form-row" style={{ alignItems: 'center' }}>
            <div className="form-group">
              <label className="form-label">Employment Duration (Months) *</label>
              <input
                type="number"
                name="employmentDurationMonths"
                className="form-control"
                placeholder="Minimum required: 6 months"
                value={formData.employmentDurationMonths}
                onChange={handleChange}
                disabled={loading}
              />
              {errors.employmentDurationMonths && <div style={{ color: 'var(--color-danger)', fontSize: '0.75rem', marginTop: '4px' }}>{errors.employmentDurationMonths}</div>}
            </div>
            
            <div className="form-group" style={{ display: 'flex', alignItems: 'center', height: '100%', marginTop: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.9rem', color: '#ffffff' }}>
                <input
                  type="checkbox"
                  name="salaryProofProvided"
                  checked={formData.salaryProofProvided}
                  onChange={handleChange}
                  disabled={loading}
                  style={{ width: '20px', height: '20px', accentColor: 'var(--color-primary)' }}
                />
                Salary Proof / Form 16 available
              </label>
            </div>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            ⚠️ Note: Salaried applications will status-pending if salary proof is missing.
          </span>
        </div>

        {/* SECTION 3: FINANCIAL HEALTH & CREDIT SCORE */}
        <div className="glass" style={{ padding: '32px', marginBottom: '40px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '24px' }}>
            3. Credit Score & Financial Exposure
          </h3>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label className="form-label">CIBIL Bureau Score: <span style={{ color: 'var(--color-primary)', fontSize: '1rem', fontWeight: 'bold' }}>{formData.cibilScore}</span></label>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: formData.cibilScore >= 750 ? 'var(--color-success)' : formData.cibilScore >= 650 ? 'var(--color-warning)' : 'var(--color-danger)' }}>
                {formData.cibilScore >= 750 ? 'EXCELLENT (Auto Approve)' : formData.cibilScore >= 650 ? 'BORDERLINE (Manual Review)' : 'LOW (Auto Reject)'}
              </span>
            </div>
            <input
              type="range"
              name="cibilScore"
              min="300"
              max="900"
              className="form-control"
              value={formData.cibilScore}
              onChange={handleChange}
              disabled={loading}
              style={{ cursor: 'pointer', padding: '0', height: '6px' }}
            />
            {errors.cibilScore && <div style={{ color: 'var(--color-danger)', fontSize: '0.75rem', marginTop: '4px' }}>{errors.cibilScore}</div>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Existing Loan Exposure (INR) *</label>
              <input
                type="number"
                name="existingLoanExposure"
                className="form-control"
                placeholder="Total outstanding active loans"
                value={formData.existingLoanExposure}
                onChange={handleChange}
                disabled={loading}
              />
              <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                Exposure &gt; ₹20 Lakhs moves to Manual Review.
              </span>
              {errors.existingLoanExposure && <div style={{ color: 'var(--color-danger)', fontSize: '0.75rem', marginTop: '4px' }}>{errors.existingLoanExposure}</div>}
            </div>
            <div className="form-group">
              <label className="form-label">Credit Card Utilization (%) *</label>
              <input
                type="number"
                name="creditCardUtilization"
                className="form-control"
                placeholder="Average billing limit utilization"
                value={formData.creditCardUtilization}
                onChange={handleChange}
                disabled={loading}
              />
              <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                Utilization &gt; 80% moves to Manual Review.
              </span>
              {errors.creditCardUtilization && <div style={{ color: 'var(--color-danger)', fontSize: '0.75rem', marginTop: '4px' }}>{errors.creditCardUtilization}</div>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Monthly Debt Obligations (INR) *</label>
            <input
              type="number"
              name="monthlyDebtObligations"
              className="form-control"
              placeholder="Total monthly EMI/obligations currently paying"
              value={formData.monthlyDebtObligations}
              onChange={handleChange}
              disabled={loading}
            />
            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block', marginTop: '4px' }}>
              Used to calculate Debt-To-Income (DTI) ratio. DTI &gt; 50% triggers Manual Review; DTI &gt; 75% triggers Reject.
            </span>
            {errors.monthlyDebtObligations && <div style={{ color: 'var(--color-danger)', fontSize: '0.75rem', marginTop: '4px' }}>{errors.monthlyDebtObligations}</div>}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/dashboard')}
            disabled={loading}
          >
            Cancel
          </button>
          
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ minWidth: '160px' }}
          >
            {loading ? 'Evaluating...' : 'Submit Application'}
          </button>
        </div>

      </form>
    </div>
  );
};

export default ApplicationForm;
