package com.yukgaejang.voss.domain.freeboard.service;

import com.yukgaejang.voss.domain.freeboard.exception.NoPostCommentException;
import com.yukgaejang.voss.domain.freeboard.exception.NoPostException;
import com.yukgaejang.voss.domain.freeboard.repository.PostCommentRepository;
import com.yukgaejang.voss.domain.freeboard.repository.PostLikeRepository;
import com.yukgaejang.voss.domain.freeboard.repository.PostRepository;
import com.yukgaejang.voss.domain.freeboard.repository.entity.Post;
import com.yukgaejang.voss.domain.freeboard.repository.entity.PostComment;
import com.yukgaejang.voss.domain.freeboard.service.PostService;
import com.yukgaejang.voss.domain.freeboard.service.dto.request.CreatePostRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.request.UpdatePostRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.*;
import com.yukgaejang.voss.domain.member.exception.NoMemberException;
import com.yukgaejang.voss.domain.member.repository.MemberRepository;
import com.yukgaejang.voss.domain.member.repository.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final PostCommentService postCommentService;
    private final PostCommentRepository postCommentRepository;
    private final MemberRepository memberRepository;
    private final PostLikeRepository postLikeRepository;

    @Override
    public CreatePostResponse createPost(String email, CreatePostRequest createPostRequest) {
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new NoMemberException("존재하지 않는 사용자입니다."));
        Post post = new Post(createPostRequest.getTitle(), createPostRequest.getContent(), member);
        postRepository.save(post);
        return new CreatePostResponse(true);
    }

    @Override
    public UpdatePostResponse updatePost(Long id, UpdatePostRequest updatePostRequest) {
        Post post = postRepository.findByIdAndIsDeletedFalse(id);
        if(post == null) throw new NoPostException("존재하지 않는 글입니다.");
        post.updatePost(updatePostRequest.getTitle(), updatePostRequest.getContent());
        postRepository.save(post);
        return new UpdatePostResponse(true);
    }

    @Override
    public PostDetailResponse getPostDetail(Long id) {
        Post post = postRepository.findByIdAndIsDeletedFalse(id);
        if(post == null) throw new NoPostException("존재하지 않는 글입니다.");
        post.updateHit();
        Page<CommentDetailResponse> comments = new PageImpl<>(postCommentService.getComments(id));
        Long likes = postLikeRepository.countByPostId(id);
        return new PostDetailResponse(postRepository.save(post), comments, likes);
    }

    @Override
    public Page<PostListResponse> getPostList(Pageable pageable) {
        return postRepository.findAllByIsDeletedFalse(pageable);
    }

    @Override
    public DeletePostResponse deletePost(Long id) {
        Post post = postRepository.findById(id).orElseThrow(() -> new NoPostException("존재하지 않는 글입니다."));
        post.delete();
        postRepository.save(post);
        List<CommentDetailResponse> comments = postCommentService.getComments(id);
        for(CommentDetailResponse comment : comments) {
            PostComment postComment = postCommentRepository.findById(comment.getId()).orElseThrow(() -> new NoPostCommentException("존재하지 않는 댓글입니다."));
            postComment.delete();
            postCommentRepository.save(postComment);
        }
        return new DeletePostResponse(true);
    }

}
