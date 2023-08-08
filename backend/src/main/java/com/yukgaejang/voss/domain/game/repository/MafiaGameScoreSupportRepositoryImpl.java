package com.yukgaejang.voss.domain.game.repository;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.yukgaejang.voss.domain.game.service.dto.request.SearchCondition;
import com.yukgaejang.voss.domain.game.service.dto.response.MafiaGameScoreListResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

import static com.yukgaejang.voss.domain.game.repository.entity.QMafiaGameScore.*;

@Repository
public class MafiaGameScoreSupportRepositoryImpl implements MafiaGameScoreSupportRepository{
    private final JPAQueryFactory queryFactory;

    public MafiaGameScoreSupportRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    @Override
    public Page<MafiaGameScoreListResponse> getScoreHistoryByMemberId(String email, Pageable pageable, SearchCondition searchCondition) {
        List<MafiaGameScoreListResponse> content = queryFactory
                .selectFrom(mafiaGameScore)
                .where(memberIdEq(searchCondition.getWhereCondition(), email))
                .orderBy(sortByField(searchCondition.getSortCondition()))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch()
                .stream()
                .map(o -> new MafiaGameScoreListResponse(o))
                .collect(Collectors.toList());

        JPAQuery<Long> countQuery = queryFactory
                .select(mafiaGameScore.count())
                .from(mafiaGameScore)
                .where(memberIdEq(searchCondition.getWhereCondition(), email));

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchOne);
    }

    private OrderSpecifier<?> sortByField(SearchCondition.SortCondition condition) {
        Order order = Order.DESC;
        if (condition == null) {
            return new OrderSpecifier<>(order, mafiaGameScore.id);
        }
        if (condition.equals(SearchCondition.SortCondition.DATE)) {
            return new OrderSpecifier<>(order, mafiaGameScore.createdAt);
        }
        if (condition.equals(SearchCondition.SortCondition.SCORE)) {
            return new OrderSpecifier<>(order, mafiaGameScore.score);
        }
        return new OrderSpecifier<>(order, mafiaGameScore.id);
    }

    private BooleanExpression memberIdEq(SearchCondition.WhereCondition whereCondition, String email) {
        return whereCondition == null ? null : mafiaGameScore.member.email.eq(email);
    }
}
