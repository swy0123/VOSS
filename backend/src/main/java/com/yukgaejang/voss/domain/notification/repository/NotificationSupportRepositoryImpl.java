package com.yukgaejang.voss.domain.notification.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.yukgaejang.voss.domain.member.repository.entity.QMember;
import com.yukgaejang.voss.domain.notification.repository.entity.QNotification;
import com.yukgaejang.voss.domain.notification.service.dto.response.ViewNotificationResponse;
import com.yukgaejang.voss.domain.practice.serivce.dto.response.ViewScriptLineResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.yukgaejang.voss.domain.member.repository.entity.QMember.*;
import static com.yukgaejang.voss.domain.notification.repository.entity.QNotification.*;

@Repository
@RequiredArgsConstructor
public class NotificationSupportRepositoryImpl implements NotificationSupportRepository {
    private final JPAQueryFactory jpaQueryFactory;
    @Override
    public List<ViewNotificationResponse> findAllNotificationsByMemberId(Long memberId) {
        return jpaQueryFactory
                .select(Projections.constructor(ViewNotificationResponse.class, notification, member.nickname))
                .from(notification)
                .join(member).on(notification.subjectId.eq(member.id))
                .where(notification.targetId.eq(memberId))
                .fetch();
    }
}
