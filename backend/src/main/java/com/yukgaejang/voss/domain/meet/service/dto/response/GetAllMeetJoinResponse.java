package com.yukgaejang.voss.domain.meet.service.dto.response;

import com.yukgaejang.voss.domain.member.repository.entity.Member;
import lombok.Data;

@Data
public class GetAllMeetJoinResponse {
    private Long memberId;
    private String nickname;

    public GetAllMeetJoinResponse(Member member) {
        this.memberId = member.getId();
        this.nickname = member.getNickname();
    }
}
