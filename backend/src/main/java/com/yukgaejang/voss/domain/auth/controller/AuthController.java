package com.yukgaejang.voss.domain.auth.controller;

import com.yukgaejang.voss.domain.member.service.MemberService;
import com.yukgaejang.voss.domain.member.service.dto.request.JoinRequest;
import com.yukgaejang.voss.domain.member.service.dto.response.JoinResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final MemberService memberService;

    @GetMapping("/jwt-test")
    public String jwtTest() {
        // throw new TokenNotValidateException("rrr");
        System.out.println("jwt 요청요철");
        return "jwtTest 요청 성공";
    }
}
