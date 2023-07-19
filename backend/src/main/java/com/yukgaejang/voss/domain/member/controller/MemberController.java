package com.yukgaejang.voss.domain.member.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    @GetMapping("/join")
    public String signUp() throws Exception {
        return "시큐리티 확인";
    }
}