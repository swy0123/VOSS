package com.yukgaejang.voss.domain.meet.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.yukgaejang.voss.domain.meet.repository.entity.MeetJoin;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.yukgaejang.voss.domain.meet.repository.entity.QMeetJoin.*;

@Repository
public class MeetJoinSupportRepositoryImpl implements MeetJoinSupportRepository{
    private final JPAQueryFactory queryFactory;

    public MeetJoinSupportRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    @Override
    public List<MeetJoin> findByMeetId(Long meetId) {
<<<<<<< HEAD
        List<MeetJoin> meetJoins = queryFactory
                .selectDistinct(meetJoin)
                .from(meetJoin)
                .where(meetJoin.meet.id.eq(meetId))
=======
        return queryFactory
                .selectFrom(meetJoin)
                .join(meetJoin.meet, meet)
                .where(meetJoin.id.eq(meetId))
>>>>>>> back-dev
                .fetch();
    }

    @Override
<<<<<<< HEAD
    public MeetJoin findByEmail(String email) {
        MeetJoin findMeetJoin = queryFactory
                .selectFrom(meetJoin)
                .where(meetJoin.member.email.eq(email))
                .fetchOne();
        return findMeetJoin;
    }
=======
    public MeetJoin findByMemberId(Long memberId) {
        return queryFactory
                .selectFrom(meetJoin)
                .where(meetJoin.member.id.eq(memberId))
                .fetchOne();
    }


>>>>>>> back-dev
}
