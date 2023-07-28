package com.yukgaejang.voss.domain.meet.service.dto.response;

import com.yukgaejang.voss.domain.meet.service.dto.MeetJoinDto;
import lombok.Data;

import java.util.List;

@Data
public class GetAllMeetJoinResponse {
    private List<MeetJoinDto> meetJoinList;

    public GetAllMeetJoinResponse(List<MeetJoinDto> meetJoinList) {
        this.meetJoinList = meetJoinList;
    }
}
