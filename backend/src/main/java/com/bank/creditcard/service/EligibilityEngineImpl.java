package com.bank.creditcard.service;

import com.bank.creditcard.dto.ApplicationRequest;
import com.bank.creditcard.model.ApplicationStatus;
import com.bank.creditcard.model.User;
import com.bank.creditcard.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Service
public class EligibilityEngineImpl implements EligibilityEngine {

    @Autowired
    private ApplicationRepository applicationRepository;

    // Simulated blacklist of suspicious/fraudulent PAN cards
    private static final Set<String> BLACKLISTED_PANS = new HashSet<>(Arrays.asList(
            "ABCDE1234F",
            "XYZAB5678C",
            "BADPA0000N",
            "FRAUD9999M"
    ));

    @Override
    public EligibilityResult evaluate(ApplicationRequest request, User user) {
        String pan = request.getPan().toUpperCase();

        // 1. FRAUD CHECK: Rate limiting (Too many applications in last 5 minutes)
        LocalDateTime fiveMinutesAgo = LocalDateTime.now().minusMinutes(5);
        long recentApplicationsCount = applicationRepository.countByUserAndCreatedAtAfter(user, fiveMinutesAgo);
        if (recentApplicationsCount >= 3) {
            return new EligibilityResult(
                    ApplicationStatus.REJECTED,
                    "Fraud detected: Too many application attempts in a short time. Please wait before applying again."
            );
        }

        // 2. FRAUD CHECK: Blacklisted PAN
        if (BLACKLISTED_PANS.contains(pan)) {
            return new EligibilityResult(
                    ApplicationStatus.REJECTED,
                    "Rejected due to security/fraud check: Blacklisted PAN."
            );
        }

        // 3. FRAUD CHECK: Duplicate application with same PAN within last 30 days
        LocalDateTime thirtyDaysAgo = LocalDateTime.now().minusDays(30);
        long duplicatePanCount = applicationRepository.findByPanAndCreatedAtAfter(pan, thirtyDaysAgo).stream()
                .filter(app -> app.getStatus() != ApplicationStatus.REJECTED) // Only count non-rejected active apps
                .count();
        if (duplicatePanCount > 0) {
            return new EligibilityResult(
                    ApplicationStatus.REJECTED,
                    "Rejected due to duplicate application detected for this PAN within 30 days."
            );
        }

        // 4. INCOME RULES: Minimum monthly income >= 25,000 INR
        if (request.getMonthlyIncome() < 25000) {
            return new EligibilityResult(
                    ApplicationStatus.REJECTED,
                    "Rejected due to insufficient monthly income. Minimum required is ₹25,000."
            );
        }

        // 5. EMPLOYMENT RULES: Minimum duration >= 6 months
        if (request.getEmploymentDurationMonths() < 6) {
            return new EligibilityResult(
                    ApplicationStatus.REJECTED,
                    "Rejected due to employment duration less than 6 months."
            );
        }

        // 6. CREDIT SCORE RULES: CIBIL Score < 650
        if (request.getCibilScore() < 650) {
            return new EligibilityResult(
                    ApplicationStatus.REJECTED,
                    "Rejected due to low CIBIL score (< 650)."
            );
        }

        // 7. DEBT-TO-INCOME (DTI) RULES: Excessive DTI > 75%
        double dti = (request.getMonthlyDebtObligations() / request.getMonthlyIncome()) * 100;
        if (dti > 75) {
            return new EligibilityResult(
                    ApplicationStatus.REJECTED,
                    "Rejected due to excessive debt-to-income ratio (> 75%)."
            );
        }

        // 8. DOCUMENTATION RULES: Salary proof required for salaried employee
        if ("SALARIED".equalsIgnoreCase(request.getEmploymentType()) && !request.getSalaryProofProvided()) {
            return new EligibilityResult(
                    ApplicationStatus.PENDING,
                    "Pending due to missing documents: Salary proof required for salaried employees."
            );
        }

        // 9. FRAUD/SUSPICIOUS PATTERN: PAN Surname Mismatch (Industry practice heuristic)
        // 5th character of PAN card represents the first character of the holder's surname (last name).
        String name = request.getFullName().trim();
        String[] nameParts = name.split("\\s+");
        if (nameParts.length > 1) {
            String surname = nameParts[nameParts.length - 1];
            if (!surname.isEmpty()) {
                char panSurnameChar = pan.charAt(4);
                char actualSurnameChar = Character.toUpperCase(surname.charAt(0));
                if (panSurnameChar != actualSurnameChar) {
                    return new EligibilityResult(
                            ApplicationStatus.MANUAL_REVIEW,
                            "Under review due to suspicious activity pattern: PAN holder surname mismatch."
                    );
                }
            }
        }

        // 10. CREDIT SCORE RULES: Borderline CIBIL Score (650 - 749)
        if (request.getCibilScore() >= 650 && request.getCibilScore() <= 749) {
            return new EligibilityResult(
                    ApplicationStatus.MANUAL_REVIEW,
                    "Under review due to borderline CIBIL score (650-749)."
            );
        }

        // 11. RISK RULES: High debt exposure (Existing Loan > 20 Lakhs / 2,000,000 INR)
        if (request.getExistingLoanExposure() > 2000000) {
            return new EligibilityResult(
                    ApplicationStatus.MANUAL_REVIEW,
                    "Under review because of high debt exposure (Existing Loan > ₹20 Lakhs)."
            );
        }

        // 12. RISK RULES: High Credit Card Utilization (> 80%)
        if (request.getCreditCardUtilization() > 80) {
            return new EligibilityResult(
                    ApplicationStatus.MANUAL_REVIEW,
                    "Under review because of high credit card utilization (> 80%)."
            );
        }

        // 13. RISK RULES: Borderline DTI (> 50%)
        if (dti > 50) {
            return new EligibilityResult(
                    ApplicationStatus.MANUAL_REVIEW,
                    "Under review due to high debt-to-income ratio (> 50%)."
            );
        }

        // 14. APPROVAL: If all rules pass
        return new EligibilityResult(
                ApplicationStatus.APPROVED,
                "Approved: Application meets all eligibility criteria."
        );
    }
}
