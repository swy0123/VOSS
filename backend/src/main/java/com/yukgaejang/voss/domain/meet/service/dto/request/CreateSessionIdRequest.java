package com.yukgaejang.voss.domain.meet.service.dto.request;

import com.yukgaejang.voss.domain.meet.repository.entity.Category;
import lombok.Data;

@Data
public class CreateSessionIdRequest {
    private String title;
    private int maxCount;
    private String password;
    private Category category;

}
