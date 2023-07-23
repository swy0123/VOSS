package com.yukgaejang.voss.domain.badge.repository;

import com.yukgaejang.voss.domain.badge.repository.entity.Attach;
import com.yukgaejang.voss.domain.badge.repository.entity.Badge;
import com.yukgaejang.voss.domain.member.repository.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;

public interface AttachRepository extends JpaRepository<Attach, Long> {
    @Query("SELECT COUNT(a) > 0 FROM Attach a " +
            "WHERE a.senderId = :senderId " +
            "AND a.receiverId = :receiverId " +
            "AND a.badgeId = :badgeId " +
            "AND a.createdAt > :limitDateTime")
    boolean existsBySenderIdAndReceiverIdAndBadgeIdAndCreatedAtAfter(Member senderId, Member receiverId, Badge badgeId, LocalDateTime limitDateTime);

}
