package com.yukgaejang.voss.domain.practice.serivce.dto.response;

import com.yukgaejang.voss.domain.practice.serivce.dto.CastingDto;
import lombok.Data;

import java.util.List;

@Data
public class ViewCastingListResponse {
    private List<CastingDto> castingDtoList;

    public ViewCastingListResponse(List<CastingDto> castingDtoList) {
        this.castingDtoList = castingDtoList;
    }
}
