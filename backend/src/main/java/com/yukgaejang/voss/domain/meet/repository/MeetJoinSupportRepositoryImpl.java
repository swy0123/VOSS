package com.yukgaejang.voss.domain.meet.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.yukgaejang.voss.domain.meet.repository.entity.MeetJoin;
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
        List<MeetJoin> meetJoins = queryFactory
                .selectFrom(meetJoin)
                .where(meetJoin.meet.id.eq(meetId))
                .fetch();
        return meetJoins;
    }
}
