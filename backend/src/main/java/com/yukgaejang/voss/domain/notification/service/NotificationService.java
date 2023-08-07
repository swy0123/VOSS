package com.yukgaejang.voss.domain.notification.service;

import com.yukgaejang.voss.domain.freeboard.repository.entity.PostComment;
import com.yukgaejang.voss.domain.freeboard.repository.entity.PostLike;
import com.yukgaejang.voss.domain.member.repository.entity.Follow;
import com.yukgaejang.voss.domain.notification.repository.NotificationRepository;
import com.yukgaejang.voss.domain.notification.repository.entity.Notification;
import com.yukgaejang.voss.domain.notification.repository.entity.NotificationType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


public interface NotificationService {
    void notifyFollow(Follow follow);
    void notifyPostComment(PostComment postComment);
    void notifyPostLike(PostLike postLike);
}
