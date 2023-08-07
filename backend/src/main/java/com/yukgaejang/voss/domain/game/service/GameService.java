package com.yukgaejang.voss.domain.game.service;

import com.yukgaejang.voss.domain.game.repository.entity.Type;
import com.yukgaejang.voss.domain.game.service.dto.response.GameSourceUploadResponse;
import org.springframework.web.multipart.MultipartFile;

public interface GameService {
    GameSourceUploadResponse uploadMafiaGameSource(MultipartFile file, String email, Type type);
}
