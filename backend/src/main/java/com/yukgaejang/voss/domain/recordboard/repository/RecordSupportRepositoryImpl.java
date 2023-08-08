package com.yukgaejang.voss.domain.recordboard.repository;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.yukgaejang.voss.domain.recordboard.repository.entity.QRecord;
import com.yukgaejang.voss.domain.recordboard.repository.entity.QRecordFile;
import com.yukgaejang.voss.domain.recordboard.repository.entity.QRecordLike;
import com.yukgaejang.voss.domain.recordboard.repository.entity.Record;
import com.yukgaejang.voss.domain.recordboard.service.dto.response.RecordDetailResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RecordSupportRepositoryImpl implements RecordSupportRepository {

    static QRecord r = QRecord.record;
    static QRecordLike rl = QRecordLike.recordLike;
    static QRecordFile rf = QRecordFile.recordFile;

    private final JPAQueryFactory jpaQueryFactory;

    public RecordSupportRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    @Override
    public Record findByIdAndIsDeletedFalse(Long id) {
        return jpaQueryFactory.selectFrom(r)
                .where(r.id.eq(id)
                        .and(r.isDeleted.eq(0)))
                .fetchOne();
    }

    public Page<RecordDetailResponse> findAllByIsDeletedFalse(Pageable pageable, Long memberId) {

        List<RecordDetailResponse> records = jpaQueryFactory
                .select(Projections.constructor(RecordDetailResponse.class,
                        r,
                        rf,
                        rl.id.count(),
                        Expressions.as(JPAExpressions
                                .select(rl.id.count().gt(0))
                                .from(rl)
                                .where(rl.record.id.eq(r.id)
                                        .and(rl.member.id.eq(memberId))), "isLiked")))
                .from(r)
                .leftJoin(r.member).fetchJoin()
                .leftJoin(rf).on(r.id.eq(rf.record.id).and(rf.isDeleted.eq(0)))
                .where(r.isDeleted.eq(0))
                .groupBy(r.id, r, r.member, rf)
                .orderBy(createOrderSpecifier(pageable))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        return new PageImpl<>(records, pageable, records.size());
    }

    private OrderSpecifier[] createOrderSpecifier(Pageable pageable) {
        OrderSpecifier[] orderSpecifiers = pageable.getSort().stream().map(order -> {
            if(order.getProperty().equals("hit")) {
                return r.hit.desc();
            } else if(order.getProperty().equals("like")) {
                return rl.id.count().desc();
            } else {
                return r.createdAt.desc();
            }
        }).toArray(OrderSpecifier[]::new);
        return orderSpecifiers;
    }
}
