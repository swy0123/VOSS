package com.yukgaejang.voss.domain.meet.service.dto.response;

import com.yukgaejang.voss.domain.meet.repository.entity.Category;
import com.yukgaejang.voss.domain.meet.repository.entity.Meet;
import com.yukgaejang.voss.domain.meet.service.dto.MeetJoinDto;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class ViewAllMeetRoomResponse {
    private Long meetRoomId;
    private Category category;
    private String title;
    private int maxCount;
    private int currentCount;
    private String sessionId;
    private boolean isPassword;

    public ViewAllMeetRoomResponse(Meet meet) {
        meetRoomId = meet.getId();
        category = meet.getCategory();
        title = meet.getTitle();
        maxCount = meet.getMaxCount();
        currentCount = meet.getMeetJoins().size();
        sessionId = meet.getSessionId();
        isPassword = meet.isPassword();

    }
}
