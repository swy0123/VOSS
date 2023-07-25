package com.yukgaejang.voss.domain.freeboard.service.dto;

import com.yukgaejang.voss.domain.freeboard.exception.NoPostException;
import com.yukgaejang.voss.domain.freeboard.repository.PostRepository;
import com.yukgaejang.voss.domain.freeboard.repository.entity.Post;
import com.yukgaejang.voss.domain.freeboard.service.dto.request.CreatePostRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.request.UpdatePostRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.PostDetailResponse;
import com.yukgaejang.voss.domain.member.exception.NoMemberException;
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
        Member member = findMember.orElseThrow(() -> new NoMemberException("존재하지 않는 사용자입니다."));
        Post post = new Post(createPostRequest.getTitle(), createPostRequest.getContent(), member);
        return postRepository.save(post) != null;
    }

    @Override
    public boolean modify(UpdatePostRequest updatePostRequest) {
        return postRepository.update(updatePostRequest.getId(), updatePostRequest.getTitle(), updatePostRequest.getContent()) != null;
    }

    @Override
    public PostDetailResponse detail(Long id) {
        Optional<Post> findPost = postRepository.findById(id);
        Post post = findPost.orElseThrow(() -> new NoPostException("존재하지 않는 글입니다."));
        Optional<Member> findMember = memberRepository.findById(post.getMember().getId());
        Member member = findMember.orElseThrow(() -> new NoMemberException("존재하지 않는 사용자입니다."));
        return new PostDetailResponse(member.getNickname(), post);
    }

}
