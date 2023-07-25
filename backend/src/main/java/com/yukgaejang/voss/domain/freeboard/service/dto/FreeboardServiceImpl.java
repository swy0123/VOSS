package com.yukgaejang.voss.domain.freeboard.service.dto;

import com.yukgaejang.voss.domain.freeboard.repository.PostRepository;
import com.yukgaejang.voss.domain.freeboard.repository.entity.Post;
import com.yukgaejang.voss.domain.freeboard.service.dto.request.CreatePostRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.request.UpdatePostRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.PostDetailResponse;
import com.yukgaejang.voss.domain.member.repository.MemberRepository;
import com.yukgaejang.voss.domain.member.repository.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FreeboardServiceImpl implements FreeboardService {

    private final PostRepository postRepository;
    private final MemberRepository memberRepository;

    @Override
    public boolean write(CreatePostRequest createPostRequest) {
        Optional<Member> findMember = memberRepository.findById(createPostRequest.getMemberId());
        Member member = findMember.orElseThrow();
        Post post = new Post(createPostRequest.getTitle(), createPostRequest.getContent(), member);
        return postRepository.save(post) != null;
    }

    @Override
    public boolean modify(UpdatePostRequest updatePostRequest) {

        return false;
    }

    @Override
    public PostDetailResponse detail(Long id) {
        Optional<Post> post = postRepository.findById(id);

        return null;
    }

}
