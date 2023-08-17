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

import static com.yukgaejang.voss.domain.member.repository.entity.QFollow.follow;
import static com.yukgaejang.voss.domain.member.repository.entity.QMember.member;

@Repository
@RequiredArgsConstructor
public class FollowSupportRepositoryImpl implements FollowSupportRepository {
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<GetFollowMemberResponse> findFollowings(Long targetId, Long myId) {
        return jpaQueryFactory
                .select(Projections.constructor(GetFollowMemberResponse.class,
                        member.id, member.email, member.nickname, member.imageUrl, jpaQueryFactory
                                .selectOne()
                                .from(follow)
                                .where(follow.follower.id.eq(myId).and(follow.following.id.eq(member.id)))
                                .exists()))
                .from(member)
                .where(jpaQueryFactory
                        .selectOne()
                        .from(follow)
                        .where(follow.follower.id.eq(targetId).and(follow.following.id.eq(member.id)))
                        .exists())
                .fetch();
    }

    @Override
    public List<GetFollowMemberResponse> findFollowers(Long targetId, Long myId) {
        return jpaQueryFactory
                .select(Projections.constructor(GetFollowMemberResponse.class,
                        member.id, member.email, member.nickname, member.imageUrl, jpaQueryFactory
                                .selectOne()
                                .from(follow)
                                .where(follow.follower.id.eq(myId).and(follow.following.id.eq(member.id)))
                                .exists()))
                .from(member)
                .where(jpaQueryFactory
                        .selectOne()
                        .from(follow)
                        .where(follow.follower.id.eq(member.id).and(follow.following.id.eq(targetId)))
                        .exists())
                .fetch();
    }

    @Override
    public void deleteFollowByMemberId(Long memberId) {
        jpaQueryFactory.delete(follow)
                .where(follow.follower.id.eq(memberId).or(follow.following.id.eq(memberId)))
                .execute();
    }
}
