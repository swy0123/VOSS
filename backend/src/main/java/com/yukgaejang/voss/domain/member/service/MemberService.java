package com.yukgaejang.voss.domain.member.service;

import com.yukgaejang.voss.domain.member.service.dto.request.FollowRequest;
import com.yukgaejang.voss.domain.member.service.dto.request.JoinRequest;
import com.yukgaejang.voss.domain.member.service.dto.request.LoginRequest;

public interface MemberService {
    void join(JoinRequest joinRequest);

    void follow(FollowRequest followRequest, String email);
}
