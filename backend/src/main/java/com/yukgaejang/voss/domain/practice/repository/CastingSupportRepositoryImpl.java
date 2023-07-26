package com.yukgaejang.voss.domain.practice.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

@Repository
public class CastingSupportRepositoryImpl implements CastingSupportRepository {

    private final JPAQueryFactory queryFactory;

    public CastingSupportRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

}
