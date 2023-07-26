package com.yukgaejang.voss.domain.practice.serivce;

import com.yukgaejang.voss.domain.practice.serivce.dto.response.ClassifyResponse;
import com.yukgaejang.voss.infra.classify.ClassifyClient;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@RequiredArgsConstructor
public class ActServiceImpl implements ActService {
    private final ClassifyClient classifyClient;

    @Override
    public ClassifyResponse analysis(MultipartFile file) {
        return classifyClient.classify(file);
    }
}
