package com.yukgaejang.voss.domain.auth.repository;

import com.yukgaejang.voss.domain.auth.repository.entity.Email;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmailRepository extends JpaRepository<Email, String> {
    Optional<Email> findByEmail(String email);
    @Transactional
    void deleteByEmail(String email);
}