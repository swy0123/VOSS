package com.yukgaejang.voss.domain.meet.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.yukgaejang.voss.domain.meet.repository.entity.Category;
import com.yukgaejang.voss.domain.meet.repository.entity.Meet;
import com.yukgaejang.voss.domain.meet.repository.entity.QMeetJoin;
import com.yukgaejang.voss.domain.meet.service.dto.request.MeetSearchCondition;
import com.yukgaejang.voss.domain.meet.service.dto.request.SelectScriptRequest;
import com.yukgaejang.voss.domain.practice.repository.entity.Script;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import static com.yukgaejang.voss.domain.meet.repository.entity.QMeet.*;
import static com.yukgaejang.voss.domain.meet.repository.entity.QMeetJoin.*;

@Repository
public class MeetSupportRepositoryImpl implements MeetSupportRepository{
    private final JPAQueryFactory queryFactory;

    public MeetSupportRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }


    @Override
    public Optional<Meet> findByMeetId(Long meetId) {
        Meet one = queryFactory
                .selectFrom(meet)
                .where(meet.id.eq(meetId))
                .fetchOne();
        return Optional.ofNullable(one);
    }

    @Override
    public long setScript(SelectScriptRequest selectScriptRequest, Script script) {
        return queryFactory
                .update(meet)
                .set(meet.script, script)
                .where(meet.id.eq(selectScriptRequest.getMeetRoomId()))
                .execute();
    }

    @Override
    public void leaveMeetRoom(Long meetId) {
        queryFactory
                .update(meet)
                .set(meet.isDeleted, true)
                .where(meet.id.eq(meetId))
                .execute();
    }

    @Override
    public Page<Meet> getMeetList(MeetSearchCondition condition, Pageable pageable) {
        List<Meet> content = queryFactory
                .selectDistinct(meet)
                .from(meet)
                .join(meet.meetJoins, meetJoin).fetchJoin()
                .where(
                        titleContains(condition.getTitle()),
                        categoryEq(condition.getCategory()),
                        meet.isDeleted.eq(false)
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
        JPAQuery<Long> countQuery = queryFactory
                .select(meet.count())
                .from(meet)
                .join(meet.meetJoins, meetJoin).fetchJoin()
                .where(
                        titleContains(condition.getTitle()),
                        categoryEq(condition.getCategory()),
                        meet.isDeleted.eq(false)
                );
        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchOne);

    }

    @Override
    public List<Meet> getMeetListBySessionId(MeetSearchCondition condition, Set<String> sessionIdList) {
        return queryFactory
                .selectDistinct(meet)
                .from(meet)
                .where(
                        meet.sessionId.in(sessionIdList),
                        titleContains(condition.getTitle()),
                        categoryEq(condition.getCategory())
                )
                .fetch();
    }

    private BooleanExpression titleContains(String title) {
        return title == null ? null : meet.title.contains(title);
    }

    private BooleanExpression categoryEq(Category category) {
        return category == null ? null : meet.category.eq(category);
    }


}
