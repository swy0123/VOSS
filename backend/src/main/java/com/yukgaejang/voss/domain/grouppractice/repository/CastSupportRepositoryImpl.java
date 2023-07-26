package com.yukgaejang.voss.domain.grouppractice.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

@Repository
public class CastSupportRepositoryImpl implements CastSupportRepository {

    private final JPAQueryFactory queryFactory;

    public CastSupportRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

}
