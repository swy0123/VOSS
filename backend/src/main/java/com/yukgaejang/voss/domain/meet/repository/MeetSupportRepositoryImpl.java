package com.yukgaejang.voss.domain.meet.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.yukgaejang.voss.domain.meet.repository.entity.Meet;
import com.yukgaejang.voss.domain.meet.service.dto.request.SelectScriptRequest;
import com.yukgaejang.voss.domain.practice.repository.entity.Script;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import static com.yukgaejang.voss.domain.meet.repository.entity.QMeet.*;

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


}
