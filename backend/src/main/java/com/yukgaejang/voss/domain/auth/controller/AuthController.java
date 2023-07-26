package com.yukgaejang.voss.domain.auth.controller;

import com.yukgaejang.voss.domain.member.service.MemberService;
import com.yukgaejang.voss.domain.member.service.dto.request.JoinRequest;
import com.yukgaejang.voss.domain.member.service.dto.response.JoinResponse;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final MemberService memberService;

    @GetMapping("/jwt-test")
    @CrossOrigin(origins = "*")
    public String jwtTest() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return "jwtTest 요청 성공 : " + authentication.getName();
    }

    @GetMapping("/test")
    public String test() {
        return "cors 통과, 도커 배포 완료";
    }

    @PostMapping("/post-test")
    public ResponseEntity<TestDto> test(@RequestBody TestDto testDto) {
        return ResponseEntity.ok(new TestDto(testDto.getName(), testDto.getAge()));
    }
}

@Data
class TestDto {
    private String name;
    private int age;

    public TestDto(String name, int age) {
        this.name = name;
        this.age = age;
    }
}