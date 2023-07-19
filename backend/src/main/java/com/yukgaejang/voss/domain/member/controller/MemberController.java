package com.yukgaejang.voss.domain.member.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MemberController {

    @GetMapping("/join")
    public String signUp() throws Exception {
        return "시큐리티 확인";
    }

    @GetMapping("/tmp")
    public String tmp() throws Exception {
        return "시큐리티 확인";
    }
}