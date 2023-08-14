package com.yukgaejang.voss.domain.auth.controller;

import com.yukgaejang.voss.domain.auth.service.AuthService;
import com.yukgaejang.voss.domain.auth.service.dto.request.ConfirmEmailRequest;
import com.yukgaejang.voss.domain.auth.service.dto.request.SendEmailRequest;
import com.yukgaejang.voss.domain.auth.service.dto.response.ConfirmEmailResponse;
import com.yukgaejang.voss.domain.auth.service.dto.response.SendEmailResponse;
import com.yukgaejang.voss.domain.member.repository.RefreshTokenRepository;
import com.yukgaejang.voss.domain.member.service.MemberService;
import com.yukgaejang.voss.domain.member.service.dto.request.JoinRequest;
import com.yukgaejang.voss.domain.member.service.dto.response.JoinResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final MemberService memberService;
    private final AuthService authService;

    @PostMapping("/refresh")
    public ResponseEntity<Boolean> refresh(HttpServletRequest request) {
        HttpHeaders header = authService.refresh(request);
        return ResponseEntity.ok().headers(header).body(true);
    }

    @PostMapping("/email")
    public ResponseEntity<SendEmailResponse> sendEmail(@RequestBody SendEmailRequest sendEmailRequest) {
        authService.sendEmail(sendEmailRequest);
        return ResponseEntity.ok(new SendEmailResponse(true));
    }


    @PostMapping("/email/confirm")
    public ResponseEntity<ConfirmEmailResponse> confirmEmail(@RequestBody ConfirmEmailRequest confirmEmailRequest) {
        authService.confirmEmail(confirmEmailRequest);
        return ResponseEntity.ok(new ConfirmEmailResponse(true));
    }

    @PutMapping("/email/password")
    public ResponseEntity<Boolean> newPassword(@RequestBody SendEmailRequest sendEmailRequest) {
        authService.sendPasswordEmail(sendEmailRequest);

        return ResponseEntity.ok(true);
    }


    @DeleteMapping("/logout")
    public ResponseEntity<Boolean> logout(@RequestHeader("Authorization-refresh") String refreshToken) {
        authService.logout(refreshToken.replace("Bearer ", ""));

        return ResponseEntity.ok(true);
    }

    @GetMapping("/jwt-test")
    public String jwtTest() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return "jwtTest 요청 성공 : " + authentication.getName();
    }

    @GetMapping("/test")
    public String test() {
        return "cors 통과, 도커 배포 완료";
    }
}