package com.yukgaejang.voss.domain.meet.service.dto.response;

import com.yukgaejang.voss.domain.meet.repository.entity.Category;
import com.yukgaejang.voss.domain.meet.repository.entity.Meet;
import lombok.Data;

@Data
public class JoinMeetRoomResponse {
    private String token;
    private String status;
    private Long meetRoomId;
    private Category category;
    private String title;
    private int maxCount;
    private Long currentCount;
    private Long createdAt;

    public JoinMeetRoomResponse(String token, String status, Meet meet) {
        this.token = token;
        this.status = status;
        this.meetRoomId = meet.getId();
        this.category = meet.getCategory();
        this.title = meet.getTitle();
        this.maxCount = meet.getMaxCount();
    }
}
