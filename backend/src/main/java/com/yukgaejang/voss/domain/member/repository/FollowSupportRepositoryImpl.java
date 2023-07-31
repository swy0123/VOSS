package com.yukgaejang.voss.domain.member.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.yukgaejang.voss.domain.member.repository.entity.QFollow;
import com.yukgaejang.voss.domain.member.repository.entity.QMember;
import com.yukgaejang.voss.domain.member.service.dto.response.GetFollowMemberResponse;
import com.yukgaejang.voss.domain.practice.serivce.dto.response.ViewScriptLineResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class FollowSupportRepositoryImpl implements FollowSupportRepository {
    private final JPAQueryFactory jpaQueryFactory;


    @Override
    public List<GetFollowMemberResponse> findFollowings(Long targetId, Long myId) {
        QFollow f = QFollow.follow;
        QMember m = QMember.member;

        return jpaQueryFactory
                .select(Projections.constructor(GetFollowMemberResponse.class,
                        m.id, m.email, m.nickname, jpaQueryFactory
                                .selectOne()
                                .from(f)
                                .where(f.follower.id.eq(myId).and(f.following.id.eq(m.id)))
                                .exists()))
                .from(m)
                .where(jpaQueryFactory
                        .selectOne()
                        .from(f)
                        .where(f.follower.id.eq(targetId).and(f.following.id.eq(m.id)))
                        .exists())
                .fetch();
    }

    @Override
    public List<GetFollowMemberResponse> findFollowers(Long targetId, Long myId) {
        QFollow f = QFollow.follow;
        QMember m = QMember.member;

        return jpaQueryFactory
                .select(Projections.constructor(GetFollowMemberResponse.class,
                        m.id, m.email, m.nickname, jpaQueryFactory
                                .selectOne()
                                .from(f)
                                .where(f.follower.id.eq(myId).and(f.following.id.eq(m.id)))
                                .exists()))
                .from(m)
                .where(jpaQueryFactory
                        .selectOne()
                        .from(f)
                        .where(f.following.id.eq(targetId).and(f.follower.id.eq(m.id)))
                        .exists())
                .fetch();
    }
}
