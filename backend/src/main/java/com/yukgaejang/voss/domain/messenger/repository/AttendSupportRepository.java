package com.yukgaejang.voss.domain.messenger.repository;

import com.yukgaejang.voss.domain.messenger.repository.entity.Attend;

import java.util.List;

public interface AttendSupportRepository {

    List<Long> findByMemberId(Long memberId);

    List<Attend> findByChatId(List<Long> chatId, Long memberId);

    void updateLastMessageTime(Long chatId, Long memberId);

    void updateLeaveTime(Long chatId, Long memberId);

    Boolean hasUnreadMessage(Long memberId);

    void deleteAttendByMemberId(Long memberId);

}
