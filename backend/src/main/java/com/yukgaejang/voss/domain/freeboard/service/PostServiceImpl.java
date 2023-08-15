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
import com.yukgaejang.voss.domain.freeboard.repository.entity.PostLike;
import com.yukgaejang.voss.global.file.service.AwsS3Service;
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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final PostCommentRepository postCommentRepository;
    private final PostLikeRepository postLikeRepository;
    private final PostFileRepository postFileRepository;
    private final MemberRepository memberRepository;
    private final AwsS3Service awsS3Service;
    private static String dirName = "post-file";

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
        List<CreateFileRequest> newFiles = updatePostRequest.getNewFiles();
        if(!newFiles.isEmpty()) {
            for (CreateFileRequest newFile : newFiles) {
                PostFile postFile = new PostFile(post, newFile.getOriginalFileName(), newFile.getSavedFileName(), newFile.getContentType(), newFile.getSize());
                postFileRepository.save(postFile);
            }
        }
        List<Long> deleteFileIds = updatePostRequest.getDeleteFileIds();
        if(!deleteFileIds.isEmpty()) {
            for (Long deleteFileId : updatePostRequest.getDeleteFileIds()) {
                PostFile postFile = postFileRepository.findByPostFileIdAndIsDeletedFalse(deleteFileId);
                awsS3Service.deleteFile(postFile.getSavedFileName(), dirName);
                postFileRepository.delete(postFile);
            }
        }
        return new UpdatePostResponse(true);
    }

    @Override
    public PostDetailResponse getPostDetail(String email, Long id) {
        Post post = postRepository.findByIdAndIsDeletedFalse(id);
        if(post == null) {
            throw new NoPostException("존재하지 않는 글입니다.");
        }
        post.updateHit();
        Page<CommentDetailResponse> comments = new PageImpl<>(postCommentRepository.findAllByPostIdAndIsDeletedFalse(id));
        Long likes = postLikeRepository.countByPostId(id);
        List<PostFileDetailResponse> imageFiles = postFileRepository.findAllByPostIdAndIsDeletedFalseAndContentTypeStartsWith(id, "image");
        List<PostFileDetailResponse> otherFiles = postFileRepository.findAllByPostIdAndIsDeletedFalseAndContentTypeNotStartsWith(id, "image");
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new NoMemberException("존재하지 않는 사용자입니다."));
        boolean isLiked = postLikeRepository.existsByPostIdAndMemberId(post.getId(), member.getId());
        List<PostLike> postLikes = postLikeRepository.findAllByPostId(id);
        List<String> likeMembers = new ArrayList<>();
        for(PostLike postLike : postLikes) {
            likeMembers.add(postLike.getMember().getNickname() + "(" + postLike.getMember().getEmail() + ")");
        }
        String likeMembersString = String.join(", ", likeMembers);
        return new PostDetailResponse(postRepository.save(post), comments, likes, imageFiles, otherFiles, isLiked, likeMembersString);
    }

    @Override
    public Page<PostListResponse> getPostList(Pageable pageable, String title, String content, String nickname) {
        return postRepository.findAllByConditionAndIsDeletedFalse(pageable, title, content, nickname);
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
        List<PostLike> likes = postLikeRepository.findAllByPostId(id);
        postLikeRepository.deleteAll(likes);
        List<PostFileDetailResponse> files = postFileRepository.findAllByPostIdAndIsDeletedFalse(id);
        for(PostFileDetailResponse file : files) {
            PostFile postFile = postFileRepository.findById(file.getId()).orElseThrow(() -> new NoPostFileException("존재하지 않는 파일입니다."));
            postFile.delete();
            postFileRepository.save(postFile);
        }
        return new DeletePostResponse(true);
    }

    @Override
    public Page<UserPostListResponse> getMyPostList(Pageable pageable, String email) {
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new NoMemberException("존재하지 않는 사용자입니다."));
        return postRepository.findAllByMemberIdAndIsDeletedFalse(pageable, member.getId());
    }

    @Override
    public Page<UserPostListResponse> getUserPostList(Pageable pageable, Long memberId) {
        return postRepository.findAllByMemberIdAndIsDeletedFalse(pageable, memberId);
    }
}
