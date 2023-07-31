package com.yukgaejang.voss.domain.freeboard.service;

import com.yukgaejang.voss.domain.freeboard.exception.NoPostCommentException;
import com.yukgaejang.voss.domain.freeboard.exception.NoPostException;
import com.yukgaejang.voss.domain.freeboard.repository.PostCommentRepository;
import com.yukgaejang.voss.domain.freeboard.repository.PostRepository;
import com.yukgaejang.voss.domain.freeboard.repository.entity.Post;
import com.yukgaejang.voss.domain.freeboard.repository.entity.PostComment;
import com.yukgaejang.voss.domain.freeboard.service.dto.request.CreateCommentRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.request.UpdateCommentRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.CommentDetailResponse;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.CreateCommentResponse;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.DeleteCommentResponse;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.UpdateCommentResponse;
import com.yukgaejang.voss.domain.member.exception.NoMemberException;
import com.yukgaejang.voss.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostCommentServiceImpl implements PostCommentService {

    private final PostCommentRepository postCommentRepository;
    private final PostRepository postRepository;
    private final MemberRepository memberRepository;

    @Override
    public CreateCommentResponse createComment(Long postId, String email, CreateCommentRequest createCommentRequest) {
        Post post = postRepository.findByIdAndIsDeletedFalse(postId);
        if(post == null) throw new NoPostException("존재하지 않는 글입니다.");
        PostComment postComment = PostComment.builder()
                .member(memberRepository.findByEmail(email).orElseThrow(() -> new NoMemberException("존재하지 않는 사용자입니다.")))
                .post(post)
                .content(createCommentRequest.getContent())
                .build();
        postCommentRepository.save(postComment);
        return new CreateCommentResponse(true);
    }

    @Override
    public UpdateCommentResponse updateComment(Long postId, Long commentId, UpdateCommentRequest updateCommentRequest) {
        Post post = postRepository.findByIdAndIsDeletedFalse(postId);
        if(post == null) throw new NoPostException("존재하지 않는 글입니다.");
        PostComment postComment = postCommentRepository.findByIdAndIsDeletedFalse(commentId);
        if(postComment == null) throw new NoPostCommentException("존재하지 않는 댓글입니다.");
        postComment.update(updateCommentRequest.getContent());
        postCommentRepository.save(postComment);
        return new UpdateCommentResponse(true);
    }

    @Override
    public List<CommentDetailResponse> getComments(Long postId) {
        Post post = postRepository.findByIdAndIsDeletedFalse(postId);
        if(post == null) throw new NoPostException("존재하지 않는 글입니다.");
        return postCommentRepository.findAllByPostIdAndIsDeletedFalse(postId);
    }

    @Override
    public DeleteCommentResponse deleteComment(Long postId, Long commentId) {
        Post post = postRepository.findByIdAndIsDeletedFalse(postId);
        if(post == null) throw new NoPostException("존재하지 않는 글입니다.");
        PostComment postComment = postCommentRepository.findByIdAndIsDeletedFalse(commentId);
        if(postComment == null) throw new NoPostCommentException("존재하지 않는 댓글입니다.");
        postComment.delete();
        postCommentRepository.save(postComment);
        return new DeleteCommentResponse(true);
    }
}
