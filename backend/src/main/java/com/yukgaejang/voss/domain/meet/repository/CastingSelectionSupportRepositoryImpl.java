package com.yukgaejang.voss.domain.meet.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.yukgaejang.voss.domain.practice.repository.entity.Casting;
import org.springframework.stereotype.Repository;

import static com.yukgaejang.voss.domain.meet.repository.entity.QCastingSelection.*;


@Repository
public class CastingSelectionSupportRepositoryImpl implements CastingSelectionSupportRepository {
    private final JPAQueryFactory queryFactory;

    public CastingSelectionSupportRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    @Override
    public void selectCasting(Long memberId, Casting casting) {
        queryFactory
                .update(castingSelection)
                .set(castingSelection.casting, casting)
                .where(castingSelection.member.id.eq(memberId))
                .execute();
    }

    @Override
    public void deleteByMemberId(Long memberId) {
        queryFactory
                .delete(castingSelection)
                .where(castingSelection.member.id.eq(memberId))
                .execute();
    }
}
