package com.yukgaejang.voss.domain.notification.repository;

import com.yukgaejang.voss.domain.notification.repository.entity.Notification;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NotificationRepository extends JpaRepository<Notification, Long>, NotificationSupportRepository {
    void deleteById(Long notiId);
    @Transactional
    void deleteByTargetId(Long targetId);
}
