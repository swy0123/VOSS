package com.yukgaejang.voss.domain.member.controller;

import com.yukgaejang.voss.domain.member.repository.RefreshTokenRepository;
import com.yukgaejang.voss.domain.member.service.MemberService;
import com.yukgaejang.voss.domain.member.service.dto.request.FollowRequest;
import com.yukgaejang.voss.domain.member.service.dto.request.JoinRequest;
import com.yukgaejang.voss.domain.member.service.dto.response.FollowResponse;
import com.yukgaejang.voss.domain.member.service.dto.response.GetFollowUserResponse;
import com.yukgaejang.voss.domain.member.service.dto.response.JoinResponse;
import com.yukgaejang.voss.global.jwt.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @DeleteMapping("/unfollow/{userId}")
    public ResponseEntity<FollowResponse> unfollow(@PathVariable("userId") Long userId) {;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        memberService.unfollow(userId, authentication.getName());
        return ResponseEntity.ok(new FollowResponse(true));
    }

    @GetMapping("/follow/following")
    public ResponseEntity<List<GetFollowUserResponse>> myFollowings() {;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        List<GetFollowUserResponse> followings = memberService.getFollowings(authentication.getName());
        return ResponseEntity.ok(followings);
    }

    @GetMapping("/follow/follower")
    public ResponseEntity<List<GetFollowUserResponse>> myFollowers() {;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        List<GetFollowUserResponse> followers = memberService.getFollowers(authentication.getName());
        return ResponseEntity.ok(followers);
    }

    @GetMapping("/follow/following/{userId}")
    public ResponseEntity<List<GetFollowUserResponse>> userFollowings(@PathVariable("userId") Long userId) {;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        List<GetFollowUserResponse> followings = memberService.getFollowings(userId, authentication.getName());
        return ResponseEntity.ok(followings);
    }

    @GetMapping("/follow/follower/{userId}")
    public ResponseEntity<List<GetFollowUserResponse>> userFollowers(@PathVariable("userId") Long userId) {;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        List<GetFollowUserResponse> followers = memberService.getFollowers(userId, authentication.getName());
        return ResponseEntity.ok(followers);
    }
}