"# Credit_Card_Application" 
# 💳 Credit Card Eligibility & Risk Assessment System

A Spring Boot–based backend application that evaluates credit card eligibility, performs risk and fraud assessment, and manages the complete lifecycle of a credit card application using secure JWT authentication and MySQL.

This project simulates a real-world banking decision engine with layered architecture, business rules, and manual review workflows.

---

## 🚀 Features Overview

### ✅ User Management
- User Registration
- Login
- JWT-based Authentication
- Role-Based Access Control
- Profile Management

### 💳 Credit Card Application
- Apply for Credit Card
- Application Validation
- Eligibility Determination
- Risk Assessment

### 📊 Credit & Risk Evaluation
- CIBIL Score Evaluation
- Debt Exposure Check
- Credit Utilization Analysis
- Debt-to-Income Ratio Calculation

### 🕵️ Fraud & Duplicate Prevention
- Duplicate Application Detection
- Blacklisted PAN Check
- Suspicious Activity Detection
- Multiple requests within short time periods handling

### 📍 Application Tracking
- Track Application Status
- Approval / Rejection Updates
- Manual Review Tracking

### 🛡️ Security
- Spring Security
- JWT Token Authentication
- Role-Based Authorization

### ⚠️ Exception Handling
- Global Exception Handling
- Validation Errors
- Authentication & Authorization Errors
- Resource Not Found Handling

### 🧪 Testing
- Unit Tests for Business Rules
- Service Layer Testing
- Controller Layer Testing
- Mockito-based Mock Testing

---

## 🧱 System Architecture
Controller Layer
↓
Service Layer
↓
Business Rules Engine
↓
Repository Layer
↓
MySQL Database


### Architecture Highlights
- Clean separation of concerns
- Centralized business rules engine
- Stateless authentication using JWT
- Production-ready layered design

---

## 🛠️ Technology Stack

### Backend
- Java 17
- Spring Boot 3

### Security
- Spring Security
- JWT Authentication

### Database
- MySQL
- JPA / Hibernate

### API Documentation
- Swagger / OpenAPI

### Build Tool
- Maven

### Testing
- JUnit 5
- Mockito

### Optional
- Lombok

---

## 📜 Business Rules & Decision Logic

### 🧾 Identity & Residency Validation
- PAN Verification
- Aadhaar Verification
- Address Validation
- Residency Eligibility Check

---

### 💼 Income & Employment Rules

| Rule | Condition |
|------|-----------|
| Minimum Monthly Income | ₹25,000 |
| Employment Duration | ≥ 6 Months |
| Salary Proof | Required if applicable |

---

### 📈 Credit Score Rules

| CIBIL Score | Decision |
|-------------|----------|
| ≥ 750 | APPROVED |
| 650 – 749 | MANUAL REVIEW |
| < 650 | REJECTED |

---

### 🧮 Risk Assessment Rules

| Rule | Action |
|------|--------|
| Existing Loan > ₹20 Lakhs | Manual Review |
| Credit Utilization > 80% | Manual Review |

---

### 🚨 Fraud Detection Rules

| Scenario | Outcome |
|----------|--------|
| Same PAN + Multiple Applications | Flag as Duplicate |
| Blacklisted PAN | Immediate Rejection |
| Suspicious Activity Pattern | Manual Review |

---

### 🔍 Manual Review Criteria
- Borderline CIBIL Score
- High Debt Exposure
- Suspicious Behavior
- Incomplete Documentation

---

### 📢 Clear Decision Messaging
- Rejected due to low CIBIL score
- Rejected due to insufficient income
- Pending due to missing documents
- Under review due to high debt exposure

---

## ⚙️ Database Configuration (MySQL)

### application.properties

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/creditcarddb
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
Maven Dependency
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
</dependency>
🧪 Testing Strategy
Unit tests for credit score calculations
Mockito-based service testing
Controller layer testing
Edge case validation for fraud and risk rules
📘 API Documentation
Swagger UI
http://localhost:8080/swagger-ui.html
OpenAPI JSON
http://localhost:8080/v3/api-docs
▶️ How to Run the Project
Prerequisites
Java 17
Maven
MySQL
Steps
git clone https://github.com/your-username/credit-card-eligibility-system.git
cd credit-card-eligibility-system
mvn clean install
mvn spring-boot:run
🧠 Key Learning Outcomes
JWT-based authentication and authorization
Real-world business rule implementation
Fraud detection strategies
Layered Spring Boot architecture
MySQL integration with JPA
Testing with JUnit and Mockito
📌 Future Enhancements
Redis-based caching
Kafka-based event notifications
Admin dashboard UI (React)
External credit bureau API integration
👨‍💻 Author

Credit Card Eligibility & Risk Assessment System
Built as a real-world backend project using Spring Boot and MySQL.

