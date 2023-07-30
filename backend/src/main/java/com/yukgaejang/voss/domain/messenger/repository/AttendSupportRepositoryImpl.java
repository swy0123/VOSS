package com.yukgaejang.voss.domain.messenger.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

@Repository
public class AttendSupportRepositoryImpl implements AttendSupportRepository{
    private final JPAQueryFactory queryFactory;

    public AttendSupportRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }
}
