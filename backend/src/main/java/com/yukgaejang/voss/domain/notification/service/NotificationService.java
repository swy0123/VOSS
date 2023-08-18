package com.yukgaejang.voss.domain.notification.service;

import com.yukgaejang.voss.domain.freeboard.repository.entity.PostComment;
import com.yukgaejang.voss.domain.freeboard.repository.entity.PostLike;
import com.yukgaejang.voss.domain.member.repository.entity.Follow;
import com.yukgaejang.voss.domain.notification.repository.NotificationRepository;
import com.yukgaejang.voss.domain.notification.repository.entity.Notification;
import com.yukgaejang.voss.domain.notification.repository.entity.NotificationType;
import com.yukgaejang.voss.domain.notification.service.dto.response.ViewNotificationResponse;
import com.yukgaejang.voss.domain.recordboard.repository.entity.RecordLike;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


public interface NotificationService {
    void notifyFollow(Follow follow);
    void notifyPostComment(PostComment postComment);
    void notifyPostLike(PostLike postLike);
    void notifyRecordLike(RecordLike recordLike);

    List<ViewNotificationResponse> getMyNotifications(String email);

    boolean readById(Long notificationId);
    boolean readAll(String email);
}
