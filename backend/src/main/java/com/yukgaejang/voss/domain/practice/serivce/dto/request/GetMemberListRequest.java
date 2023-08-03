package com.yukgaejang.voss.domain.practice.serivce.dto.request;

import lombok.Getter;

@Getter
public class GetMemberListRequest {
    private String nickname;
    private int page;
    private int limit;

    public GetMemberListRequest(String nickname, int page, int limit) {
        this.nickname = nickname;
        this.page = page;
        this.limit = limit;
    }
}
