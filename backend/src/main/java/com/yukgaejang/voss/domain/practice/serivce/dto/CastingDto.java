package com.yukgaejang.voss.domain.practice.serivce.dto;

import com.yukgaejang.voss.domain.practice.repository.entity.Casting;
import lombok.Data;

@Data
public class CastingDto {
    private Long castId;
    private String  name;

    public CastingDto(Casting casting) {
        this.castId = casting.getId();
        this.name = casting.getName();
    }
}
