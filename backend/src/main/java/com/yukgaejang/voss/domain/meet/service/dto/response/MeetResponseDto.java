package com.yukgaejang.voss.domain.meet.service.dto.response;

import com.yukgaejang.voss.domain.meet.repository.entity.Meet;
import com.yukgaejang.voss.domain.meet.service.dto.MeetJoinDto;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class MeetResponseDto {
    private String category;
    private String title;
    private int maxCount;
    private int currentCount;
    private List<MeetJoinDto> meetJoins;

    public MeetResponseDto(Meet meet) {
        category = meet.getCategory();
        title = meet.getTitle();
        maxCount = meet.getMaxCount();
        currentCount = meet.getMeetJoins().size();
        meetJoins = meet.getMeetJoins().stream()
                .map(meetJoin -> new MeetJoinDto(meetJoin))
                .collect(Collectors.toList());
    }
}
