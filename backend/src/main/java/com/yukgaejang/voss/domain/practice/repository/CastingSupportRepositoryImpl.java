package com.yukgaejang.voss.domain.practice.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.yukgaejang.voss.domain.practice.repository.entity.Casting;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.yukgaejang.voss.domain.practice.repository.entity.QCasting.*;

@Repository
public class CastingSupportRepositoryImpl implements CastingSupportRepository {

    private final JPAQueryFactory queryFactory;

    public CastingSupportRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    @Override
    public List<Casting> findByScriptId(Long scriptId) {
        return queryFactory
                .selectFrom(casting)
                .where(casting.script.id.eq(scriptId))
                .fetch();
    }

    @Override
    public Casting findCasting(Long castingId) {
        return queryFactory
                .selectDistinct(casting)
                .from(casting)
                .where(casting.id.eq(castingId))
                .fetchOne();
    }
}
