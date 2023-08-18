package com.yukgaejang.voss.domain.badge.service.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BadgeListResponse {
    private Long id;
    private String name;

    public BadgeListResponse(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}
