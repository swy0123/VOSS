package com.yukgaejang.voss.domain.grouppractice.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.yukgaejang.voss.domain.grouppractice.repository.entity.Cast;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.yukgaejang.voss.domain.grouppractice.repository.entity.QCast.*;

@Repository
public class CastSupportRepositoryImpl implements CastSupportRepository {

    private final JPAQueryFactory queryFactory;

    public CastSupportRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }


    @Override
    public List<Cast> findByMeetRoomId(Long meetRoomId) {
        return queryFactory
                .selectFrom(cast)
                .where(cast.meetJoin.meet.id.eq(meetRoomId))
                .fetch();
    }
}
