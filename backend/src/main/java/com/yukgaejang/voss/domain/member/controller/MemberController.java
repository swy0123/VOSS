package com.yukgaejang.voss.domain.member.controller;

import com.yukgaejang.voss.domain.member.repository.RefreshTokenRepository;
import com.yukgaejang.voss.domain.member.service.MemberService;
import com.yukgaejang.voss.domain.member.service.dto.request.FollowRequest;
import com.yukgaejang.voss.domain.member.service.dto.request.JoinRequest;
import com.yukgaejang.voss.domain.member.service.dto.response.FollowResponse;
import com.yukgaejang.voss.domain.member.service.dto.response.JoinResponse;
import com.yukgaejang.voss.global.jwt.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {
    private final MemberService memberService;
    private final JwtService jwtService;
    private final RefreshTokenRepository refreshTokenRepository;

    @PostMapping
    public ResponseEntity<JoinResponse> join(@RequestBody JoinRequest joinRequest) {
        memberService.join(joinRequest);
        return ResponseEntity.ok(new JoinResponse(true));
    }

    @PostMapping("/follow")
    public ResponseEntity<FollowResponse> follow(@RequestBody FollowRequest followRequest/*, @AuthenticationPrincipal Authentication authentication*/) {;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        memberService.follow(followRequest , authentication.getName());
        return ResponseEntity.ok(new FollowResponse(true));
    }

    @DeleteMapping("/follow/{userId}")
    public ResponseEntity<FollowResponse> unfollow(@RequestBody FollowRequest followRequest) {;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        memberService.follow(followRequest , authentication.getName());
        return ResponseEntity.ok(new FollowResponse(true));
    }

    @GetMapping("/follow/following")
    public ResponseEntity<FollowResponse> myFollowings(@RequestBody FollowRequest followRequest) {;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        memberService.follow(followRequest , authentication.getName());
        return ResponseEntity.ok(new FollowResponse(true));
    }

    @GetMapping("/follow/follower")
    public ResponseEntity<FollowResponse> myFollowers(@RequestBody FollowRequest followRequest) {;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        memberService.follow(followRequest , authentication.getName());
        return ResponseEntity.ok(new FollowResponse(true));
    }


}