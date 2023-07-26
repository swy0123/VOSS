package com.yukgaejang.voss.domain.freeboard.service.dto;

import com.yukgaejang.voss.domain.freeboard.exception.NoPostCommentException;
import com.yukgaejang.voss.domain.freeboard.repository.PostCommentRepository;
import com.yukgaejang.voss.domain.freeboard.repository.PostRepository;
import com.yukgaejang.voss.domain.freeboard.repository.entity.PostComment;
import com.yukgaejang.voss.domain.freeboard.service.dto.request.CreateCommentRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.request.UpdateCommentRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.CommentDetailResponse;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.CreateCommentResponse;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.DeleteCommentResponse;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.UpdateCommentResponse;
import com.yukgaejang.voss.domain.member.repository.MemberRepository;
import com.yukgaejang.voss.domain.member.repository.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostCommentServiceImpl implements PostCommentService {

    private final PostCommentRepository postCommentRepository;
    private final PostRepository postRepository;
    private final MemberRepository memberRepository;

    @Override
    public CreateCommentResponse createComment(CreateCommentRequest createCommentRequest) {
        PostComment postComment = PostComment.builder()
                .member(memberRepository.findByEmail(createCommentRequest.getEmail()).orElseThrow(() -> new RuntimeException("존재하지 않는 사용자입니다.")))
                .post(postRepository.findById(createCommentRequest.getPostId()).orElseThrow(() -> new RuntimeException("존재하지 않는 글입니다.")))
                .content(createCommentRequest.getContent())
                .build();
        return new CreateCommentResponse(postCommentRepository.save(postComment) != null ? true : false);
    }

    @Override
    public UpdateCommentResponse updateComment(UpdateCommentRequest updateCommentRequest) {
        Optional<PostComment> findPostComment = postCommentRepository.findById(updateCommentRequest.getCommentId());
        PostComment postComment = findPostComment.orElseThrow(() -> new NoPostCommentException("존재하지 않는 댓글입니다."));
        postComment.update(updateCommentRequest.getContent());
        return new UpdateCommentResponse(postCommentRepository.save(postComment) != null ? true : false);
    }

    @Override
    public Page<CommentDetailResponse> getComments(Long postId, int page, int limit) {
        PageRequest pageRequest = PageRequest.of(page, limit);
        Page<PostComment> allPostComments = postCommentRepository.findAllByPostIdAndIsDeletedFalse(postId, pageRequest);
        return allPostComments.map(o -> new CommentDetailResponse(o));
    }

    @Override
    public DeleteCommentResponse deleteComment(Long commentId) {
        Optional<PostComment> findPostComment = postCommentRepository.findById(commentId);
        PostComment postComment = findPostComment.orElseThrow(() -> new NoPostCommentException("존재하지 않는 댓글입니다."));
        postComment.delete();
        return new DeleteCommentResponse(postCommentRepository.save(postComment) != null ? true : false);
    }
<<<<<<< HEAD

=======
>>>>>>> back-dev
}
