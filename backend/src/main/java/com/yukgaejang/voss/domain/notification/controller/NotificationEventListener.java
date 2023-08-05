package com.yukgaejang.voss.domain.notification.controller;

import com.yukgaejang.voss.domain.member.event.FollowEvent;
import com.yukgaejang.voss.domain.member.repository.entity.Follow;
import com.yukgaejang.voss.domain.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class NotificationEventListener {
    private final NotificationService notificationService;

    @EventListener
    @Async
    public void followNotification(FollowEvent followEvent) {
        Follow follow = followEvent.getFollow();

    }
}
