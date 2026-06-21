package com.bank.creditcard.repository;

import com.bank.creditcard.model.CreditCardApplication;
import com.bank.creditcard.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<CreditCardApplication, Long> {
    List<CreditCardApplication> findByUserIdOrderByCreatedAtDesc(Long userId);
    List<CreditCardApplication> findByPanOrderByCreatedAtDesc(String pan);
    

    List<CreditCardApplication> findByPanAndCreatedAtAfter(String pan, LocalDateTime dateTime);
    

    long countByUserAndCreatedAtAfter(User user, LocalDateTime dateTime);
}
