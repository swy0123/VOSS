package com.yukgaejang.voss.domain.freeboard.controller;

import com.yukgaejang.voss.domain.freeboard.exception.NoPostFileException;
import com.yukgaejang.voss.domain.freeboard.repository.PostFileRepository;
import com.yukgaejang.voss.domain.freeboard.repository.entity.PostFile;
import com.yukgaejang.voss.domain.freeboard.service.*;
import com.yukgaejang.voss.global.file.service.AwsS3Service;
import com.yukgaejang.voss.global.file.service.dto.CreateFileRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.request.CreateCommentRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.request.CreatePostRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.request.UpdateCommentRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.request.UpdatePostRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.*;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/freeboard")
public class FreeboardController {
    private final PostService postService;
    private final PostCommentService postCommentService;
    private final PostLikeService postLikeService;
    private final PostFileRepository postFileRepository;
    private final AwsS3Service awsS3Service;

    private static String dirName = "post-file";

    @PostMapping("/upload")
    public ResponseEntity<List<CreateFileRequest>> uploadMultipleFile(@RequestPart(required = false) List<MultipartFile> files) {
        return ResponseEntity.ok(awsS3Service.uploadMultiFile(files, dirName));
    }

//    @GetMapping("/download/{fileId}")
//    public void downloadBoardFile(@PathVariable Long fileId, HttpServletResponse response){
//        try {
//            PostFile postFile = postFileRepository.findByPostFileIdAndIsDeletedFalse(fileId);
//            if (ObjectUtils.isEmpty(postFile) == false){
//                String fileName = postFile.getOriginalFileName();
//                byte[] files = postFile.readFileToByteArray(new File(postFile.getStoredFilePath()));
//
//                response.setContentType("application/octet-stream");
//                response.setContentLength(files.length);
//                response.setHeader("Content-Disposition","attachment; fileName=\""+ URLEncoder.encode(fileName,StandardCharsets.UTF_8)+"\";");
//                response.setHeader("Content-Transfer-Encoding","binary");
//
//                response.getOutputStream().write(files);
//                response.getOutputStream().flush();
//                response.getOutputStream().close();
//
//            }
//        } catch (IOException e){
//            log.error(e.getMessage());
//            e.getStackTrace();
//        }
//    }

    @PostMapping
    public ResponseEntity<CreatePostResponse> createPost(@RequestBody CreatePostRequest createPostRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return ResponseEntity.ok(postService.createPost(email, createPostRequest));
    }

    @PutMapping("/{postId}")
    public  ResponseEntity<UpdatePostResponse> updatePost(@PathVariable Long postId, @RequestBody UpdatePostRequest updatePostRequest) {
        return ResponseEntity.ok(postService.updatePost(postId, updatePostRequest));
    }

    @GetMapping("/{postId}")
    public ResponseEntity<PostDetailResponse> getPostDetail(@PathVariable Long postId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return ResponseEntity.ok(postService.getPostDetail(email, postId));
    }

    @GetMapping
    public ResponseEntity<Page<PostListResponse>> getPostList(@PageableDefault Pageable pageable, @RequestParam(required = false) String title, @RequestParam(required = false) String content, @RequestParam(required = false) String nickname, @RequestParam(required = false) String sort) {
        Sort sortBy = null;
        if (sort == null) {
            sortBy = Sort.by("createdAt").descending();
        } else {
            sortBy = Sort.by(sort, "createdAt").descending();
        }
        pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sortBy);
        return ResponseEntity.ok(postService.getPostList(pageable, title, content, nickname));
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<DeletePostResponse> deletePost(@PathVariable Long postId) {
        return ResponseEntity.ok(postService.deletePost(postId));
    }

    @PostMapping("/{postId}/comment")
    public ResponseEntity<CreateCommentResponse> createComment(@PathVariable Long postId, @RequestBody CreateCommentRequest createCommentRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return ResponseEntity.ok(postCommentService.createComment(postId, email, createCommentRequest));
    }

    @GetMapping("/{postId}/comment")
    public ResponseEntity<Page<CommentDetailResponse>> getComments(@PathVariable Long postId, @PageableDefault(size = 100) Pageable pageable) {
        return ResponseEntity.ok(new PageImpl<>(postCommentService.getComments(postId)));
    }

    @PutMapping("/{postId}/comment/{commentId}")
    public ResponseEntity<UpdateCommentResponse> updateComment(@PathVariable Long postId, @PathVariable Long commentId, @RequestBody UpdateCommentRequest updateCommentRequest) {
        return ResponseEntity.ok(postCommentService.updateComment(postId, commentId, updateCommentRequest));
    }

    @DeleteMapping("/{postId}/comment/{commentId}")
    public ResponseEntity<DeleteCommentResponse> deleteComment(@PathVariable Long postId, @PathVariable Long commentId) {
        return ResponseEntity.ok(postCommentService.deleteComment(postId, commentId));
    }

    @PostMapping("/{postId}/like")
    public ResponseEntity<CreatePostLikeResponse> createPostLike(@PathVariable Long postId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return ResponseEntity.ok(postLikeService.createPostLike(postId, email));
    }

    @DeleteMapping("/{postId}/like")
    public ResponseEntity<DeletePostLikeResponse> deletePostLike(@PathVariable Long postId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return ResponseEntity.ok(postLikeService.deletePostLike(postId, email));
    }

    @GetMapping("/my-post")
    public ResponseEntity<Page<UserPostListResponse>> getMyPostList(@PageableDefault Pageable pageable) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return ResponseEntity.ok(postService.getMyPostList(pageable, email));
    }

    @GetMapping("/my-comment")
    public ResponseEntity<Page<UserCommentListResponse>> getMyCommentList(@PageableDefault(size = 6) Pageable pageable) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return ResponseEntity.ok(postCommentService.getMyCommentList(pageable, email));
    }

    @GetMapping("/user-post/{memberId}")
    public ResponseEntity<Page<UserPostListResponse>> getUserPostList(@PageableDefault Pageable pageable, @PathVariable Long memberId) {
        return ResponseEntity.ok(postService.getUserPostList(pageable, memberId));
    }

    @GetMapping("/user-comment/{memberId}")
    public ResponseEntity<Page<UserCommentListResponse>> getUserCommentList(@PageableDefault Pageable pageable, @PathVariable Long memberId) {
        return ResponseEntity.ok(postCommentService.getUserCommentList(pageable, memberId));
    }
}
