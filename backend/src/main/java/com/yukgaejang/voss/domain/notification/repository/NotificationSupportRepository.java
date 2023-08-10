package com.yukgaejang.voss.domain.notification.repository;

import com.yukgaejang.voss.domain.notification.service.dto.response.ViewNotificationResponse;

import java.util.List;

public interface NotificationSupportRepository {
    List<ViewNotificationResponse> findAllNotificationsByMemberId(Long memberId);

}
