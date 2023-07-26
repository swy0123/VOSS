package com.yukgaejang.voss.domain.practice.serivce;

import com.yukgaejang.voss.domain.practice.serivce.dto.response.ViewCastingListResponse;

public interface CastingService {

    ViewCastingListResponse getCastingList(Long scriptId);
}
