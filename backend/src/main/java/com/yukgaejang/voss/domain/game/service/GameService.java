package com.yukgaejang.voss.domain.game.service;

import com.yukgaejang.voss.domain.game.repository.entity.Type;
import com.yukgaejang.voss.domain.game.service.dto.request.SearchCondition;
import com.yukgaejang.voss.domain.game.service.dto.response.GameSourceUploadResponse;
import com.yukgaejang.voss.domain.game.service.dto.response.MafiaGameScoreListResponse;
import com.yukgaejang.voss.domain.game.service.dto.response.MafiaGameSourceListResponse;
import com.yukgaejang.voss.domain.game.service.dto.response.StatusResponse;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface GameService {
    GameSourceUploadResponse uploadMafiaGameSource(MultipartFile file, String email, Type type);

    List<MafiaGameSourceListResponse> getRandomMafiaSourceListLimitCnt(int cnt);

    StatusResponse addMafiaGameScore(String email, int score);

    Page<MafiaGameScoreListResponse> getMafiaGameScoreList(String email, SearchCondition searchCondition);
}
