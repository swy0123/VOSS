package com.yukgaejang.voss.domain.auth.repository;

import com.yukgaejang.voss.domain.auth.repository.entity.Email;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailRepository extends JpaRepository<Email, String> {
}
