package com.yukgaejang.voss.domain.messenger.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.yukgaejang.voss.domain.messenger.service.dto.ViewMessengerListDto;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

import static com.yukgaejang.voss.domain.messenger.repository.entity.QAttend.*;

@Repository
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
    public List<ViewMessengerListDto> findByChatId(List<Long> chatId, Long memberId) {
        return queryFactory
                .select(attend)
                .from(attend)
                .where(attend.chat.id.in(chatId), attend.member.id.ne(memberId))
                .fetch()
                .stream()
                .map(o -> new ViewMessengerListDto(o))
                .collect(Collectors.toList());
    }
}
