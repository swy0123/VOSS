package com.yukgaejang.voss.domain.notification.repository;

import com.yukgaejang.voss.domain.notification.repository.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
}
