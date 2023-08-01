package com.yukgaejang.voss.domain.practice.serivce;

import com.yukgaejang.voss.domain.practice.serivce.dto.request.AddStatRequest;

public interface PracticeService {
    void addStat(AddStatRequest addStatRequest, String email);
}
