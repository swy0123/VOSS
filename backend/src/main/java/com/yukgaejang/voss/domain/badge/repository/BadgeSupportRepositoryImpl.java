package com.yukgaejang.voss.domain.badge.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.yukgaejang.voss.domain.badge.repository.entity.Attach;
import com.yukgaejang.voss.domain.badge.repository.entity.QBadge;
import com.yukgaejang.voss.domain.badge.service.dto.response.BadgeListResponse;
import com.yukgaejang.voss.domain.badge.service.dto.response.ViewBadgeResponse;
import com.yukgaejang.voss.domain.member.repository.entity.Member;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import static com.yukgaejang.voss.domain.badge.repository.entity.QBadge.badge;
import static com.yukgaejang.voss.domain.badge.repository.entity.QAttach.attach;

import java.util.List;


@Repository
@RequiredArgsConstructor
public class BadgeSupportRepositoryImpl implements BadgeSupportRepository {
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<ViewBadgeResponse> findAllBadgeByMember(Member member) {

        return jpaQueryFactory
                .select(
                        Projections.constructor(
                                ViewBadgeResponse.class,
                                badge.id,
                                badge.name,
                                attach.count()
                        )
                )
                .from(badge)
                .leftJoin(attach).on(badge.eq(attach.badgeId))
                .where(attach.receiverId.eq(member))
                .groupBy(badge.id, badge.name)
                .fetch();
    }


    public List<BadgeListResponse> findAllBadge() {
        return jpaQueryFactory
                .select(Projections.constructor(BadgeListResponse.class, badge.id, badge.name))
                .from(badge)
                .fetch();
    }

    @Override
    @Transactional
    public void deleteAttachBySenderIdOrReceiverId(Long memberId) {
        jpaQueryFactory.delete(attach)
                .where(attach.senderId.id.eq(memberId).or(attach.receiverId.id.eq(memberId)))
                .execute();
    }


}
