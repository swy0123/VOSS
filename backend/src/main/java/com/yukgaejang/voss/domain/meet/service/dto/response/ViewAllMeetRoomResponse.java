package com.yukgaejang.voss.domain.meet.service.dto.response;

import com.yukgaejang.voss.domain.meet.repository.entity.Category;
import com.yukgaejang.voss.domain.meet.repository.entity.Meet;
import lombok.Data;


@Data
public class ViewAllMeetRoomResponse {
    private Long meetRoomId;
    private Category category;
    private String title;
    private int maxCount;
    private Long currentCount;
    private Long createdAt;
    private String sessionId;
    private boolean isPassword;
    private Long scriptId;

    public ViewAllMeetRoomResponse(Meet meet) {
        meetRoomId = meet.getId();
        category = meet.getCategory();
        title = meet.getTitle();
        maxCount = meet.getMaxCount();
        sessionId = meet.getSessionId();
        isPassword = meet.isPassword();
        scriptId = meet.getScript() == null ? 0L : meet.getScript().getId();
    }
}
