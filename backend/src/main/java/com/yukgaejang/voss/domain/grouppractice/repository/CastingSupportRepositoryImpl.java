package com.yukgaejang.voss.domain.grouppractice.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.yukgaejang.voss.domain.grouppractice.repository.entity.Casting;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.yukgaejang.voss.domain.grouppractice.repository.entity.QCasting.*;

@Repository
public class CastingSupportRepositoryImpl implements CastingSupportRepository{

    private final JPAQueryFactory queryFactory;

    public CastingSupportRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }


    @Override
    public List<Casting> findByMeetRoomId(Long meetRoomId) {
        return queryFactory
                .selectFrom(casting)
                .where(casting.meetJoin.meet.id.eq(meetRoomId))
                .fetch();
    }
}
