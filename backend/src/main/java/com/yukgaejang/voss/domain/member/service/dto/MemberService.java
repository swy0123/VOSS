package com.yukgaejang.voss.domain.member.service.dto;

import com.yukgaejang.voss.domain.member.service.dto.request.JoinRequest;
public interface MemberService {
    void join(JoinRequest joinRequest);
}
