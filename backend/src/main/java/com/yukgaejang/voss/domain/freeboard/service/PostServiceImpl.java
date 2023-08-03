package com.yukgaejang.voss.domain.freeboard.service;

import com.yukgaejang.voss.domain.freeboard.exception.NoPostCommentException;
import com.yukgaejang.voss.domain.freeboard.exception.NoPostException;
import com.yukgaejang.voss.domain.freeboard.exception.NoPostFileException;
import com.yukgaejang.voss.domain.freeboard.repository.PostCommentRepository;
import com.yukgaejang.voss.domain.freeboard.repository.PostFileRepository;
import com.yukgaejang.voss.domain.freeboard.repository.PostLikeRepository;
import com.yukgaejang.voss.domain.freeboard.repository.PostRepository;
import com.yukgaejang.voss.domain.freeboard.repository.entity.Post;
import com.yukgaejang.voss.domain.freeboard.repository.entity.PostComment;
import com.yukgaejang.voss.domain.freeboard.repository.entity.PostFile;
import com.yukgaejang.voss.global.file.service.dto.CreateFileRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.request.CreatePostRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.request.UpdatePostRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.*;
import com.yukgaejang.voss.domain.member.exception.NoMemberException;
import com.yukgaejang.voss.domain.member.repository.MemberRepository;
import com.yukgaejang.voss.domain.member.repository.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final PostCommentRepository postCommentRepository;
    private final PostLikeRepository postLikeRepository;
    private final PostFileRepository postFileRepository;
    private final MemberRepository memberRepository;

    @Override
    public CreatePostResponse createPost(String email, CreatePostRequest createPostRequest) {
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new NoMemberException("존재하지 않는 사용자입니다."));
        Post post = new Post(createPostRequest.getTitle(), createPostRequest.getContent(), member);
        postRepository.save(post);
        List<CreateFileRequest> files = createPostRequest.getFiles();
        if(files.isEmpty()) {
            return new CreatePostResponse(true);
        }
        for (CreateFileRequest file : files) {
            PostFile postFile = new PostFile(post, file.getOriginalFileName(), file.getSavedFileName(), file.getContentType(), file.getSize());
            postFileRepository.save(postFile);
        }
        return new CreatePostResponse(true);
    }

    @Override
    public UpdatePostResponse updatePost(Long id, UpdatePostRequest updatePostRequest) {
        Post post = postRepository.findByIdAndIsDeletedFalse(id);
        if(post == null) {
            throw new NoPostException("존재하지 않는 글입니다.");
        }
        post.updatePost(updatePostRequest.getTitle(), updatePostRequest.getContent());
        postRepository.save(post);
        List<CreateFileRequest> files = updatePostRequest.getFiles();
        if(files.isEmpty()) {
            return new UpdatePostResponse(true);
        }
        for (CreateFileRequest file : files) {
            PostFile postFile = new PostFile(post, file.getOriginalFileName(), file.getSavedFileName(), file.getContentType(), file.getSize());
            postFileRepository.save(postFile);
        }
        return new UpdatePostResponse(true);
    }

    @Override
    public PostDetailResponse getPostDetail(Long id) {
        Post post = postRepository.findByIdAndIsDeletedFalse(id);
        if(post == null) {
            throw new NoPostException("존재하지 않는 글입니다.");
        }
        post.updateHit();
        Page<CommentDetailResponse> comments = new PageImpl<>(postCommentRepository.findAllByPostIdAndIsDeletedFalse(id));
        Long likes = postLikeRepository.countByPostId(id);
        List<PostFileDetailResponse> imageFiles = postFileRepository.findAllByPostIdAndIsDeletedFalseAndContentTypeStartsWith(id, "image");
        List<PostFileDetailResponse> otherFiles = postFileRepository.findAllByPostIdAndIsDeletedFalseAndContentTypeNotStartsWith(id, "image");
        return new PostDetailResponse(postRepository.save(post), comments, likes, imageFiles, otherFiles);
    }

    @Override
    public Page<PostListResponse> getPostList(Pageable pageable) {
        return postRepository.findAllByIsDeletedFalse(pageable);
    }

    @Override
    public DeletePostResponse deletePost(Long id) {
        Post post = postRepository.findByIdAndIsDeletedFalse(id);
        if(post == null) {
            throw new NoPostException("존재하지 않는 글입니다.");
        }
        post.delete();
        postRepository.save(post);
        List<CommentDetailResponse> comments = postCommentRepository.findAllByPostIdAndIsDeletedFalse(id);
        for(CommentDetailResponse comment : comments) {
            PostComment postComment = postCommentRepository.findById(comment.getId()).orElseThrow(() -> new NoPostCommentException("존재하지 않는 댓글입니다."));
            postComment.delete();
            postCommentRepository.save(postComment);
        }
        List<PostFileDetailResponse> files = postFileRepository.findAllByPostIdAndIsDeletedFalse(id);
        for(PostFileDetailResponse file : files) {
            PostFile postFile = postFileRepository.findById(file.getId()).orElseThrow(() -> new NoPostFileException("존재하지 않는 파일입니다."));
            postFile.delete();
            postFileRepository.save(postFile);
        }
        return new DeletePostResponse(true);
    }

}
