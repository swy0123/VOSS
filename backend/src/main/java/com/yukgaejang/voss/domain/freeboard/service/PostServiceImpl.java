package com.yukgaejang.voss.domain.freeboard.service;

import com.yukgaejang.voss.domain.freeboard.exception.NoPostException;
import com.yukgaejang.voss.domain.freeboard.repository.PostRepository;
import com.yukgaejang.voss.domain.freeboard.repository.entity.Post;
import com.yukgaejang.voss.domain.freeboard.service.PostService;
import com.yukgaejang.voss.domain.freeboard.service.dto.request.CreatePostRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.request.UpdatePostRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.*;
import com.yukgaejang.voss.domain.member.exception.NoMemberException;
import com.yukgaejang.voss.domain.member.repository.MemberRepository;
import com.yukgaejang.voss.domain.member.repository.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final MemberRepository memberRepository;

    @Override
    public CreatePostResponse createPost(String email, CreatePostRequest createPostRequest) {
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new NoMemberException("존재하지 않는 사용자입니다."));
        Post post = new Post(createPostRequest.getTitle(), createPostRequest.getContent(), member);
        postRepository.save(post);
        return new CreatePostResponse(true);
    }

    @Override
    public UpdatePostResponse updatePost(Long id, UpdatePostRequest updatePostRequest) {
        Post post = postRepository.findById(id).orElseThrow(() -> new NoPostException("존재하지 않는 글입니다."));
        post.updatePost(updatePostRequest.getTitle(), updatePostRequest.getContent());
        postRepository.save(post);
        return new UpdatePostResponse(true);
    }

    @Override
    public PostDetailResponse getPostDetail(Long id) {
        Post post = postRepository.findById(id).orElseThrow(() -> new NoPostException("존재하지 않는 글입니다."));
        post.updateHit();
        return new PostDetailResponse(postRepository.save(post));
    }

    @Override
    public Page<PostListResponse> getPostList(Pageable pageable) {
        Page<Post> allPosts = postRepository.findAllByIsDeletedFalse(pageable);
        return allPosts.map(PostListResponse::new);
    }

    @Override
    public DeletePostResponse deletePost(Long id) {
        Post post = postRepository.findById(id).orElseThrow(() -> new NoPostException("존재하지 않는 글입니다."));
        post.delete();
        postRepository.save(post);
        return new DeletePostResponse(true);
    }

}
