package com.yukgaejang.voss.domain.game.service;

import com.yukgaejang.voss.domain.game.repository.entity.Type;
import com.yukgaejang.voss.domain.game.service.dto.response.GameSourceUploadResponse;
import com.yukgaejang.voss.domain.game.service.dto.response.MafiaGameSourceListResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface GameService {
    GameSourceUploadResponse uploadMafiaGameSource(MultipartFile file, String email, Type type);

    List<MafiaGameSourceListResponse> getRandomMafiaSourceListLimitCnt(int cnt);
}
