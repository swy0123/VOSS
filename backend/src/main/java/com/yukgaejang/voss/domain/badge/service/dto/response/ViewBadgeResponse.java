package com.yukgaejang.voss.domain.badge.service.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ViewBadgeResponse {
    private Long id;
    private String name;
    private Long cnt;

    public ViewBadgeResponse(Long id, String name, Long cnt) {
        this.id = id;
        this.name = name;
        this.cnt = cnt;
    }
}
