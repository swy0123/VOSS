package com.yukgaejang.voss.domain.recordboard.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.core.types.dsl.StringPath;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.yukgaejang.voss.domain.recordboard.repository.entity.QRecord;
import com.yukgaejang.voss.domain.recordboard.repository.entity.QRecordFile;
import com.yukgaejang.voss.domain.recordboard.repository.entity.QRecordLike;
import com.yukgaejang.voss.domain.recordboard.repository.entity.Record;
import com.yukgaejang.voss.domain.recordboard.service.dto.response.MyRecordListResponse;
import com.yukgaejang.voss.domain.recordboard.service.dto.response.RecordDetailResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

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

    @Override
    public Page<RecordDetailResponse> findAllByConditionAndIsDeletedFalse(Pageable pageable, Long memberId, String description, String nickname) {
        BooleanBuilder builder = new BooleanBuilder();
        if(description != null) {
            builder.and(r.description.contains(description));
        }
        if(nickname != null) {
            builder.and(r.member.nickname.eq(nickname));
        }

        List<RecordDetailResponse> records = jpaQueryFactory
                .selectDistinct(Projections.constructor(RecordDetailResponse.class,
                        r,
                        rf.originalFileName,
                        rf.savedFileName,
                        r.recordLikes.size(),
                        JPAExpressions
                                .selectOne()
                                .from(rl)
                                .where(rl.record.id.eq(r.id)
                                        .and(rl.member.id.eq(memberId)))
                ))
                .from(r)
                .leftJoin(r.member).fetchJoin()
                .leftJoin(rf).on(r.id.eq(rf.record.id).and(rf.isDeleted.eq(0)))
                .where(r.isDeleted.eq(0).and(builder))
                .orderBy(createOrderSpecifier(pageable))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Long> countQuery = jpaQueryFactory
                .select(r.id)
                .from(r)
                .where(r.isDeleted.eq(0).and(builder));

        return new PageImpl<>(records, pageable, countQuery.fetchCount());
    }

    @Override
    public Page<MyRecordListResponse> findAllByMemberEmailAndIsDeletedFalse(Pageable pageable, String email) {
        List<MyRecordListResponse> records = jpaQueryFactory
                .selectDistinct(Projections.constructor(MyRecordListResponse.class,
                        r,
                        rf.originalFileName,
                        rf.savedFileName,
                        r.recordLikes.size(),
                        JPAExpressions
                                .selectOne()
                                .from(rl)
                                .where(rl.record.id.eq(r.id)
                                        .and(rl.member.email.eq(email)))
                ))
                .from(r)
                .leftJoin(r.member).fetchJoin()
                .leftJoin(rf).on(r.id.eq(rf.record.id).and(rf.isDeleted.eq(0)))
                .where(r.isDeleted.eq(0)
                        .and(r.member.email.eq(email)))
                .orderBy(r.createdAt.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Long> countQuery = jpaQueryFactory
                .select(r.id)
                .from(r)
                .where(r.isDeleted.eq(0)
                        .and(r.member.email.eq(email)));
        return new PageImpl<>(records, pageable, countQuery.fetchCount());
    }

    private OrderSpecifier[] createOrderSpecifier(Pageable pageable) {
        return pageable.getSort().stream().map(order -> {
            if(order.getProperty().equals("hit")) {
                return r.hit.desc();
            } else if(order.getProperty().equals("like")) {
                return r.recordLikes.size().desc();
            } else {
                return r.createdAt.desc();
            }
        }).toArray(OrderSpecifier[]::new);
    }
}