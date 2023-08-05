package com.yukgaejang.voss.domain.notification.service;

import com.yukgaejang.voss.domain.member.repository.entity.Follow;

public interface NotificationService {
    void notifyFollow(Follow follow);
}
