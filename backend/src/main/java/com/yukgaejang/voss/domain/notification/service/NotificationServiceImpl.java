package com.yukgaejang.voss.domain.notification.service;

import com.yukgaejang.voss.domain.freeboard.repository.entity.PostComment;
import com.yukgaejang.voss.domain.freeboard.repository.entity.PostLike;
import com.yukgaejang.voss.domain.member.exception.NoMemberException;
import com.yukgaejang.voss.domain.member.repository.MemberRepository;
import com.yukgaejang.voss.domain.member.repository.entity.Follow;
import com.yukgaejang.voss.domain.member.repository.entity.Member;
import com.yukgaejang.voss.domain.notification.repository.NotificationRepository;
import com.yukgaejang.voss.domain.notification.repository.entity.Notification;
import com.yukgaejang.voss.domain.notification.repository.entity.NotificationType;
import com.yukgaejang.voss.domain.notification.service.dto.response.ViewNotificationResponse;
import com.yukgaejang.voss.domain.recordboard.repository.entity.RecordLike;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {
    private final NotificationRepository notificationRepository;
    private final MemberRepository memberRepository;

    @Override
    public void notifyFollow(Follow follow) {
        notificationRepository.save(new Notification(follow.getFollower().getId(), follow.getFollowing().getId(), NotificationType.FOLLOW));
    }

    @Override
    public void notifyPostComment(PostComment postComment) {
        notificationRepository.save(new Notification(postComment.getMember().getId(), postComment.getPost().getMember().getId(), postComment.getPost().getId(), NotificationType.COMMENT));
    }

    @Override
    public void notifyPostLike(PostLike postLike) {
        notificationRepository.save(new Notification(postLike.getMember().getId(), postLike.getPost().getMember().getId(), postLike.getPost().getId(), NotificationType.POST_LIKE));
    }

    @Override
    public void notifyRecordLike(RecordLike recordLike) {
        notificationRepository.save(new Notification(recordLike.getMember().getId(), recordLike.getRecord().getMember().getId(), recordLike.getRecord().getId(), NotificationType.RECORD_LIKE));
    }

    @Override
    public List<ViewNotificationResponse> getMyNotifications(String email) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new NoMemberException("존재하지 않는 이메일입니다."));

        return notificationRepository.findAllNotificationsByMemberId(member.getId());
    }

    @Override
    public boolean readById(Long notificationId) {
        notificationRepository.deleteById(notificationId);
        return true;
    }

    @Override
    public boolean readAll(String email) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new NoMemberException("존재하지 않는 이메일입니다."));
        notificationRepository.deleteByTargetId(member.getId());
        return true;
    }
}
