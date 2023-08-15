package com.yukgaejang.voss.domain.meet.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.yukgaejang.voss.domain.meet.repository.entity.Category;
import com.yukgaejang.voss.domain.meet.repository.entity.Meet;
import com.yukgaejang.voss.domain.meet.service.dto.request.MeetSearchCondition;
import com.yukgaejang.voss.domain.meet.service.dto.request.SelectScriptRequest;
import com.yukgaejang.voss.domain.practice.repository.entity.Script;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import static com.yukgaejang.voss.domain.meet.repository.entity.QMeet.*;

@Repository
public class MeetSupportRepositoryImpl implements MeetSupportRepository{
    private final JPAQueryFactory queryFactory;
    private final EntityManager em;

    public MeetSupportRepositoryImpl(JPAQueryFactory queryFactory, EntityManager em) {
        this.queryFactory = queryFactory;
        this.em = em;
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
        long execute = queryFactory
                .update(meet)
                .set(meet.script, script)
                .where(meet.id.eq(selectScriptRequest.getMeetRoomId()))
                .execute();
        em.flush();
        em.clear();
        return execute;
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
