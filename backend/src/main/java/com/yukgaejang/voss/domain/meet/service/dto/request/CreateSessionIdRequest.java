package com.yukgaejang.voss.domain.meet.service.dto.request;

import lombok.Data;

@Data
public class CreateSessionIdRequest {
    private String email;
    private String title;
    private int maxCount;
    private String password;
    private String category;

}
