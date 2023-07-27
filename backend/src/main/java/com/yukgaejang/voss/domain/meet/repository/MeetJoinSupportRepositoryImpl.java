package com.yukgaejang.voss.domain.meet.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.yukgaejang.voss.domain.meet.repository.entity.MeetJoin;
import com.yukgaejang.voss.domain.practice.repository.entity.Casting;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.yukgaejang.voss.domain.meet.repository.entity.QMeet.*;
import static com.yukgaejang.voss.domain.meet.repository.entity.QMeetJoin.*;

@Repository
public class MeetJoinSupportRepositoryImpl implements MeetJoinSupportRepository{
    private final JPAQueryFactory queryFactory;

    public MeetJoinSupportRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    @Override
    public List<MeetJoin> findByMeetId(Long meetId) {
        return queryFactory
                .selectFrom(meetJoin)
                .join(meetJoin.meet, meet)
                .where(meetJoin.meet.id.eq(meetId))
                .fetch();
    }

    @Override
    public MeetJoin findByMemberId(Long memberId) {
        return queryFactory
                .selectFrom(meetJoin)
                .where(meetJoin.member.id.eq(memberId))
                .fetchOne();
    }

    @Override
    public void selectCasting(Long memberId, Long meetRoomId, Casting casting) {
        queryFactory
                .update(meetJoin)
                .set(meetJoin.casting, casting)
                .where(meetJoin.member.id.eq(memberId).and(meetJoin.meet.id.eq(meetRoomId)))
                .execute();
    }

    @Override
    public void resetCasting(Long meetRoomId) {
        queryFactory
                .update(meetJoin)
                .setNull(meetJoin.casting)
                .where(meetJoin.meet.id.eq(meetRoomId))
                .execute();
    }
}
