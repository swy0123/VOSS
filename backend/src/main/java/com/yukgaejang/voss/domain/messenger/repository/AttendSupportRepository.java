package com.yukgaejang.voss.domain.messenger.repository;

import com.yukgaejang.voss.domain.messenger.service.dto.response.ViewMessengerListResponse;

import java.util.List;

public interface AttendSupportRepository {

    List<Long> findByMemberId(Long memberId);

    List<ViewMessengerListResponse> findByChatId(List<Long> chatId, Long memberId);

}
