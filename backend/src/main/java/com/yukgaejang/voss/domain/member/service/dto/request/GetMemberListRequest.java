package com.yukgaejang.voss.domain.member.service.dto.request;

import lombok.Getter;

@Getter
public class GetMemberListRequest {
    private String keyword;
    private int page;
    private int limit;

    public GetMemberListRequest(String keyword, int page, int limit) {
        this.keyword = keyword;
        this.page = page;
        this.limit = limit;
    }
}
