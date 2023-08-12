package com.yukgaejang.voss.domain.member.service.dto.response;

import com.yukgaejang.voss.domain.member.repository.entity.Member;
import lombok.Getter;

@Getter
public class GetMemberList {
    Long memberId;
    String nickname;
    String email;
    String imageUrl;

    public GetMemberList(Member member) {
        this.memberId = member.getId();
        this.nickname = member.getNickname();
        this.email = member.getEmail();
        this.imageUrl = member.getImageUrl();
    }
}
