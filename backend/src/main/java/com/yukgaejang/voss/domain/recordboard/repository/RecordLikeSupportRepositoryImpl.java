package com.yukgaejang.voss.domain.recordboard.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.yukgaejang.voss.domain.recordboard.repository.entity.QRecordLike;

public class RecordLikeSupportRepositoryImpl implements RecordLikeSupportRepository {
    static QRecordLike rl = QRecordLike.recordLike;

    private final JPAQueryFactory jpaQueryFactory;

    public RecordLikeSupportRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    @Override
    public boolean existsByRecordIdAndEmail(Long recordId, String email) {
        return jpaQueryFactory
                .selectOne()
                .from(rl)
                .where(rl.record.id.eq(recordId)
                        .and(rl.member.email.eq(email)))
                .fetchOne() != null;
    }
}
