package com.yukgaejang.voss.domain.freeboard.service.dto;

import com.yukgaejang.voss.domain.freeboard.exception.NoPostException;
import com.yukgaejang.voss.domain.freeboard.repository.PostRepository;
import com.yukgaejang.voss.domain.freeboard.repository.entity.Post;
import com.yukgaejang.voss.domain.freeboard.service.dto.request.CreatePostRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.request.UpdatePostRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.*;
import com.yukgaejang.voss.domain.member.exception.NoMemberException;
import com.yukgaejang.voss.domain.member.repository.MemberRepository;
import com.yukgaejang.voss.domain.member.repository.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FreeboardServiceImpl implements FreeboardService {

    private final PostRepository postRepository;
    private final MemberRepository memberRepository;

    @Override
    public CreatePostResponse write(CreatePostRequest createPostRequest) {
        Optional<Member> findMember = memberRepository.findById(createPostRequest.getMemberId());
        Member member = findMember.orElseThrow(() -> new NoMemberException("존재하지 않는 사용자입니다."));
        Post post = new Post(createPostRequest.getTitle(), createPostRequest.getContent(), member);
        return new CreatePostResponse(postRepository.save(post) != null ? true : false);
    }

    @Override
    public UpdatePostResponse modify(UpdatePostRequest updatePostRequest) {
        Optional<Post> findPost = postRepository.findById(updatePostRequest.getId());
        Post post = findPost.orElseThrow(() -> new NoPostException("존재하지 않는 글입니다."));
        post.update(updatePostRequest.getTitle(), updatePostRequest.getContent());
        return new UpdatePostResponse(postRepository.save(post) != null ? true : false);
    }

    @Override
    public PostDetailResponse detail(Long id) {
        Optional<Post> findPost = postRepository.findById(id);
        Post post = findPost.orElseThrow(() -> new NoPostException("존재하지 않는 글입니다."));
        post.updateHit();
        return new PostDetailResponse(post);
    }

    @Override
    public Page<PostListResponse> getPostList(int page, int limit) {
        PageRequest pageRequest = PageRequest.of(page, limit);
        Page<Post> allPosts = postRepository.findAllByIsDeletedFalse(pageRequest);
        return allPosts.map(o -> new PostListResponse(o));
    }

    @Override
    public DeletePostResponse delete(Long id) {
        Optional<Post> findPost = postRepository.findById(id);
        Post post = findPost.orElseThrow(() -> new NoPostException("존재하지 않는 글입니다."));
        post.delete();
        return new DeletePostResponse(postRepository.save(post) != null ? true : false);
    }

}
