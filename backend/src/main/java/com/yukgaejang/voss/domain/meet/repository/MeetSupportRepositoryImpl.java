package com.yukgaejang.voss.domain.meet.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.yukgaejang.voss.domain.meet.repository.entity.Meet;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import static com.yukgaejang.voss.domain.meet.repository.entity.QMeet.*;

@Repository
public class MeetSupportRepositoryImpl implements MeetSupportRepository{
    private final JPAQueryFactory queryFactory;

    public MeetSupportRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }


    @Override
    public Optional<Meet> findByMeetId(Long meetId) {
        Meet one = queryFactory
                .selectFrom(meet)
                .where(meet.id.eq(meetId))
                .fetchOne();
        return Optional.ofNullable(one);
    }
}
