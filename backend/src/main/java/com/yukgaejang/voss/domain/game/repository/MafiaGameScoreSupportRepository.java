package com.yukgaejang.voss.domain.game.repository;

import com.yukgaejang.voss.domain.game.service.dto.request.SearchCondition;
import com.yukgaejang.voss.domain.game.service.dto.response.MafiaGameScoreListResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MafiaGameScoreSupportRepository {

    Page<MafiaGameScoreListResponse> getScoreHistoryByMemberId(String email, Pageable pageable, SearchCondition searchCondition);
}
