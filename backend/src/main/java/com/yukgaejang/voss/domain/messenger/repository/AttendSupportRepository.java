package com.yukgaejang.voss.domain.messenger.repository;

import com.yukgaejang.voss.domain.messenger.service.dto.ViewMessengerListDto;

import java.util.List;

public interface AttendSupportRepository {

    List<Long> findByMemberId(Long memberId);

    List<ViewMessengerListDto> findByChatId(List<Long> chatId, Long memberId);

}
