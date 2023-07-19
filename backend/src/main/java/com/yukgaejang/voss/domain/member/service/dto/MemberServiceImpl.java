package com.yukgaejang.voss.domain.member.service.dto;

import com.yukgaejang.voss.domain.member.service.dto.request.JoinRequest;
import com.yukgaejang.voss.domain.member.service.dto.response.JoinResponse;
import org.springframework.stereotype.Service;

@Service
public class MemberServiceImpl implements MemberService {

    @Override
    public void join(JoinRequest joinRequest) {
        System.out.println("====" + new JoinResponse(true));
    }
}
