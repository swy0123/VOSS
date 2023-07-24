package com.yukgaejang.voss.domain.meet.service.dto.request;

import lombok.Data;

@Data
public class CreateSessionIdRequest {
    private String title;
    private int maxCount;
    private String password;
    private String category;

    public CreateSessionIdRequest(String title, int maxCount, String password, String category) {
        this.title = title;
        this.maxCount = maxCount;
        this.password = password;
        this.category = category;
    }
}
