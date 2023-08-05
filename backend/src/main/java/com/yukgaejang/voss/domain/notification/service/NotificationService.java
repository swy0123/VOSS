package com.yukgaejang.voss.domain.notification.service;

import com.yukgaejang.voss.domain.member.repository.entity.Follow;
import com.yukgaejang.voss.domain.notification.repository.NotificationRepository;
import com.yukgaejang.voss.domain.notification.repository.entity.Notification;
import com.yukgaejang.voss.domain.notification.repository.entity.NotificationType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


public interface NotificationService {
    public void notifyFollow(Follow follow);
}
