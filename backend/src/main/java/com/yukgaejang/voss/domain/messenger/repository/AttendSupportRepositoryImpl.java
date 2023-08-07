package com.yukgaejang.voss.domain.messenger.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.yukgaejang.voss.domain.messenger.repository.entity.Attend;
import com.yukgaejang.voss.domain.messenger.service.dto.response.ViewMessengerListResponse;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import static com.yukgaejang.voss.domain.messenger.repository.entity.QAttend.*;

@Repository
@Transactional
public class AttendSupportRepositoryImpl implements AttendSupportRepository{
    private final JPAQueryFactory queryFactory;

    public AttendSupportRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    @Override
    public List<Long> findByMemberId(Long memberId) {
        return queryFactory
                .select(attend.chat.id)
                .from(attend)
                .where(attend.member.id.eq(memberId))
                .fetch();
    }

    @Override
    public List<ViewMessengerListResponse> findByChatId(List<Long> chatId, Long memberId) {
        return queryFactory
                .select(attend)
                .from(attend)
                .where(attend.chat.id.in(chatId), attend.member.id.ne(memberId))
                .orderBy(attend.receiveMessageTime.desc())
                .fetch()
                .stream()
                .map(o -> new ViewMessengerListResponse(o))
                .collect(Collectors.toList());
    }

    @Override
    public void updateLastMessageTime(Long chatId, Long memberId) {
        queryFactory
                .update(attend)
                .set(attend.receiveMessageTime, LocalDateTime.now())
                .where(
                        attend.chat.id.eq(chatId),
                        attend.member.id.ne(memberId)
                )
                .execute();
    }

    @Override
    public void updateLeaveTime(Long chatId, Long memberId) {
        queryFactory
                .update(attend)
                .set(attend.leaveTime, LocalDateTime.now())
                .where(
                        attend.chat.id.eq(chatId),
                        attend.member.id.eq(memberId)
                )
                .execute();
    }

    @Override
    public Boolean isReceiveMessage(Long memberId) {
        List<Attend> fetch = queryFactory
                .select(attend)
                .from(attend)
                .orderBy(attend.receiveMessageTime.desc())
                .where(attend.member.id.eq(memberId))
                .fetch();
        LocalDateTime leaveTime = fetch.get(0).getLeaveTime();
        LocalDateTime receiveMessageTime = fetch.get(0).getReceiveMessageTime();
        return leaveTime.compareTo(receiveMessageTime) < 0 ? true : false;
    }
}
