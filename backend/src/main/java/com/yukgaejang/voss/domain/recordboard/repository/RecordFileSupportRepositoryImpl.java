package com.yukgaejang.voss.domain.recordboard.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.yukgaejang.voss.domain.recordboard.repository.entity.QRecordFile;
import com.yukgaejang.voss.domain.recordboard.repository.entity.RecordFile;

public class RecordFileSupportRepositoryImpl implements RecordFileSupportRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public RecordFileSupportRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    @Override
    public RecordFile findByRecordIdAndIsDeletedFalse(Long recordId) {
        QRecordFile rf = QRecordFile.recordFile;
        return jpaQueryFactory.selectFrom(rf)
                .where(rf.record.id.eq(recordId)
                        .and(rf.isDeleted.eq(0)))
                .fetchOne();
    }

    @Override
    public RecordFile findByIdAndIsDeletedFalse(Long id) {
        QRecordFile rf = QRecordFile.recordFile;
        return jpaQueryFactory.selectFrom(rf)
                .where(rf.id.eq(id)
                        .and(rf.isDeleted.eq(0)))
                .fetchOne();
    }
}
