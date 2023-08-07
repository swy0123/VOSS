package com.yukgaejang.voss.domain.recordboard.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.yukgaejang.voss.domain.recordboard.repository.entity.Record;
import org.springframework.stereotype.Repository;
import static com.yukgaejang.voss.domain.recordboard.repository.entity.QRecord.*;

@Repository
public class RecordSupportRepositoryImpl implements RecordSupportRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public RecordSupportRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }


    @Override
    public Record findByIdAndIsDeletedFalse(Long id) {
        return jpaQueryFactory.selectFrom(record)
                .where(record.id.eq(id)
                        .and(record.isDeleted.eq(0)))
                .fetchOne();
    }

}
