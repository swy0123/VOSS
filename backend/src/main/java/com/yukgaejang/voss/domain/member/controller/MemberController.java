package com.yukgaejang.voss.domain.member.controller;

import com.yukgaejang.voss.domain.member.service.MemberService;
import com.yukgaejang.voss.domain.member.service.dto.request.JoinRequest;
import com.yukgaejang.voss.domain.member.service.dto.response.JoinResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {
    private final MemberService memberService;

    @PostMapping("/join")
    public ResponseEntity<JoinResponse> signUp(@RequestBody JoinRequest joinRequest) {
        memberService.join(joinRequest);
        return ResponseEntity.ok(new JoinResponse(true));
    }
}