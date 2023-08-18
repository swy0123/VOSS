package com.yukgaejang.voss.domain.messenger.repository;

import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.yukgaejang.voss.domain.messenger.repository.entity.Attend;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

import static com.yukgaejang.voss.domain.messenger.repository.entity.QAttend.*;

@Repository
@Transactional
public class AttendSupportRepositoryImpl implements AttendSupportRepository{
    private final JPAQueryFactory queryFactory;
    private final EntityManager em;
    public AttendSupportRepositoryImpl(JPAQueryFactory queryFactory, EntityManager em) {
        this.queryFactory = queryFactory;
        this.em = em;
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
    public List<Attend> findByChatId(List<Long> chatId, Long memberId) {
        return queryFactory
                .select(attend)
                .from(attend)
                .where(attend.chat.id.in(chatId), attend.member.id.ne(memberId))
                .orderBy(attend.receiveMessageTime.desc())
                .fetch();
    }

    @Override
    public void updateLastMessageTime(Long chatId, Long memberId) {
        queryFactory
                .update(attend)
                .set(attend.receiveMessageTime, LocalDateTime.now())
                .where(
                        attend.chat.id.eq(chatId),
                        attend.member.id.eq(memberId)
                )
                .execute();
        em.flush();
        em.clear();
    }

    @Override
    public void updateLeaveTime(Long chatId, Long memberId) {
        queryFactory
                .update(attend)
                .set(attend.leaveTime, LocalDateTime.now())
                .where(
                        attend.chat.id.eq(chatId),
                        attend.member.id.ne(memberId)
                )
                .execute();
        em.flush();
        em.clear();
    }

    @Override
    public Boolean hasUnreadMessage(Long memberId) {
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

    public void deleteAttendByMemberId(Long memberId) {
        queryFactory
                .delete(attend)
                .where(attend.chat.id.in(
                        JPAExpressions
                                .select(attend.chat.id)
                                .from(attend)
                                .where(attend.member.id.eq(memberId))
                ))
                .execute();

        queryFactory
                .delete(attend)
                .where(attend.member.id.eq(memberId))
                .execute();
    }
}
