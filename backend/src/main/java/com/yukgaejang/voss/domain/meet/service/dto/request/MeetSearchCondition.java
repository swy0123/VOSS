package com.yukgaejang.voss.domain.meet.service.dto.request;

import com.yukgaejang.voss.domain.meet.repository.entity.Category;
import lombok.Data;

@Data
public class MeetSearchCondition {
    // 제목, 카테고리
    private String title;
    private Category category;
}
