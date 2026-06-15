-- Credit Card Eligibility System - Database Schema

CREATE DATABASE IF NOT EXISTS creditcarddb;
USE creditcarddb;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(20) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100)
);

-- 2. Credit Card Applications Table
CREATE TABLE IF NOT EXISTS credit_card_applications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(10) NOT NULL,
    pan VARCHAR(10) NOT NULL,
    aadhaar VARCHAR(12) NOT NULL,
    address VARCHAR(500) NOT NULL,
    pincode VARCHAR(6) NOT NULL,
    monthly_income DOUBLE NOT NULL,
    employment_duration_months INT NOT NULL,
    employment_type VARCHAR(50) NOT NULL, -- SALARIED, SELF_EMPLOYED
    cibil_score INT NOT NULL,
    existing_loan_exposure DOUBLE NOT NULL,
    credit_card_utilization DOUBLE NOT NULL,
    monthly_debt_obligations DOUBLE NOT NULL,
    salary_proof_provided BOOLEAN NOT NULL,
    status VARCHAR(50) NOT NULL, -- APPROVED, REJECTED, MANUAL_REVIEW, PENDING
    decision_message VARCHAR(500),
    created_at DATETIME NOT NULL,
    updated_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Indexes for Optimization and Fraud/Duplicate Checks
CREATE INDEX idx_user_applications ON credit_card_applications(user_id);
CREATE INDEX idx_pan_applications ON credit_card_applications(pan);
CREATE INDEX idx_created_at ON credit_card_applications(created_at);

-- 4. Initial Demo Users Setup
-- Password hashes correspond to BCrypt encoding of "password"
-- To generate custom passwords, sign up directly via the frontend portal!
INSERT INTO users (username, password, email, role, first_name, last_name)
VALUES 
('aman', '$2a$10$wS2Wb1a.J2iP1Z66n5Dqfuk7.lO9m6D9lP6q3cR8K7W6/hFhWwVKe', 'aman@bank.com', 'ROLE_USER', 'Aman', 'Sharma')
ON DUPLICATE KEY UPDATE id=id;

INSERT INTO users (username, password, email, role, first_name, last_name)
VALUES 
('admin', '$2a$10$wS2Wb1a.J2iP1Z66n5Dqfuk7.lO9m6D9lP6q3cR8K7W6/hFhWwVKe', 'admin@bank.com', 'ROLE_ADMIN', 'System', 'Admin')
ON DUPLICATE KEY UPDATE id=id;
