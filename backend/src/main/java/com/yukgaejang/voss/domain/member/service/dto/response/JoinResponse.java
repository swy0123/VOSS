package com.yukgaejang.voss.domain.member.service.dto.response;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.mapping.Join;

@Setter
@Getter
public class JoinResponse {
    Boolean isJoinSuccess;

    public JoinResponse(Boolean isJoinSuccess) {
        this.isJoinSuccess = isJoinSuccess;
    }
}
