package com.yukgaejang.voss.domain.member.repository;

import com.yukgaejang.voss.domain.member.repository.entity.RefreshToken;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, String> {
    Optional<RefreshToken> findByEmail(String email);
    boolean existsByRefreshToken(String refreshToken);

    @Transactional
    @Modifying
    @Query("UPDATE RefreshToken r SET r.refreshToken = :newRefreshToken WHERE r.refreshToken = :originRefreshToken")
    void updateRefreshToken(String originRefreshToken, String newRefreshToken);

    Optional<RefreshToken> findByRefreshToken(String refreshToken);
}
