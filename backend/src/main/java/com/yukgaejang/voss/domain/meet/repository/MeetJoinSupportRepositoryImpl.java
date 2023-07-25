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
        List<MeetJoin> meetJoins = queryFactory
                .selectDistinct(meetJoin)
                .from(meetJoin)
                .where(meetJoin.meet.id.eq(meetId))
                .fetch();
        return meetJoins;
    }

    @Override
    public MeetJoin findByEmail(String email) {
        MeetJoin findMeetJoin = queryFactory
                .selectFrom(meetJoin)
                .where(meetJoin.member.email.eq(email))
                .fetchOne();
        return findMeetJoin;
    }
}
