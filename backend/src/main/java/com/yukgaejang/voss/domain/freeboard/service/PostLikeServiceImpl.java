package com.yukgaejang.voss.domain.freeboard.service;

import com.yukgaejang.voss.domain.freeboard.exception.NoPostException;
import com.yukgaejang.voss.domain.freeboard.repository.PostLikeRepository;
import com.yukgaejang.voss.domain.freeboard.repository.PostRepository;
import com.yukgaejang.voss.domain.freeboard.repository.entity.Post;
import com.yukgaejang.voss.domain.freeboard.repository.entity.PostLike;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.CreatePostLikeResponse;
import com.yukgaejang.voss.domain.member.exception.NoMemberException;
import com.yukgaejang.voss.domain.member.repository.MemberRepository;
import com.yukgaejang.voss.domain.member.repository.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PostLikeServiceImpl implements PostLikeService {

    private final PostRepository postRepository;
    private final PostLikeRepository postLikeRepository;
    private final MemberRepository memberRepository;


    @Override
    public CreatePostLikeResponse createPostLike(Long postId, String email) {
        Post post = postRepository.findByIdAndIsDeletedFalse(postId);
        if(post == null) throw new NoPostException("존재하지 않는 글입니다.");
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new NoMemberException("존재하지 않는 사용자입니다."));
        if(!postLikeRepository.existsByPostIdAndEmail(postId, email)) {
            PostLike postLike = PostLike.builder()
                    .post(post)
                    .member(member)
                    .build();
            postLikeRepository.save(postLike);
        }
        return new CreatePostLikeResponse(true);
    }
}
