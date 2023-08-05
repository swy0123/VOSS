package com.yukgaejang.voss.domain.notification.service;

import com.yukgaejang.voss.domain.member.repository.entity.Follow;
import com.yukgaejang.voss.domain.notification.repository.NotificationRepository;
import com.yukgaejang.voss.domain.notification.repository.entity.Notification;
import com.yukgaejang.voss.domain.notification.repository.entity.NotificationType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {
    private NotificationRepository notificationRepository;

    @Override
    public void notifyFollow(Follow follow) {
        notificationRepository.save(new Notification(follow.getFollower().getId(), follow.getFollowing().getId(), NotificationType.FOLLOW));
    }
}
