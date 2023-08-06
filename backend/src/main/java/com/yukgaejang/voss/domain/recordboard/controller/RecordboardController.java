package com.yukgaejang.voss.domain.recordboard.controller;

import com.yukgaejang.voss.domain.recordboard.service.dto.request.CreateRecordRequest;
import com.yukgaejang.voss.domain.recordboard.service.dto.request.UpdateRecordRequest;
import com.yukgaejang.voss.domain.recordboard.service.dto.response.*;
import com.yukgaejang.voss.global.file.service.AwsS3Service;
import com.yukgaejang.voss.global.file.service.dto.CreateFileRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.print.Pageable;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/recordboard")
public class RecordboardController {

    private final RecordService recordService;
    private final RecordLikeService recordLikeService;
    private final AwsS3Service awsS3Service;

    private final String dirName = "record-file";

    @PostMapping("/upload")
    public ResponseEntity<List<CreateFileRequest>> uploadMultipleFile(@RequestPart(required = false) List<MultipartFile> files) {
        return ResponseEntity.ok(awsS3Service.uploadMultiFile(files, dirName));
    }

    @PostMapping
    public ResponseEntity<CreateRecordResponse> createRecord(@RequestBody CreateRecordRequest createRecordRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return ResponseEntity.ok(recordService.createRecord(email, createRecordRequest));
    }

    @PutMapping("/{recordId}")
    public  ResponseEntity<UpdateRecordResponse> updateRecord(@PathVariable Long recordId, @RequestBody UpdateRecordRequest updateRecordRequest) {
        return ResponseEntity.ok(recordService.updateRecord(recordId, updateRecordRequest));
    }

    @GetMapping("/{recordId}")
    public ResponseEntity<RecordDetailResponse> getRecordDetail(@PathVariable Long recordId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return ResponseEntity.ok(recordService.getRecordDetail(email, recordId));
    }

    @GetMapping
    public ResponseEntity<Page<RecordListResponse>> getRecordList(@RequestParam(required = false) String description,
                                                                  @RequestParam(required = false) String nickname,
                                                                  @RequestParam(required = false) String sort,
                                                                  @PageableDefault Pageable pageable) {
        return ResponseEntity.ok(recordService.getRecordList(description, nickname, sort, pageable));
    }

    @DeleteMapping("/{recordId}")
    public ResponseEntity<DeleteRecordResponse> deleteRecord(@PathVariable Long recordId) {
        return ResponseEntity.ok(recordService.deleteRecord(recordId));
    }

    @PostMapping("/{recordId}/like")
    public ResponseEntity<CreateRecordLikeResponse> createRecordLike(@PathVariable Long recordId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return ResponseEntity.ok(recordLikeService.createRecordLike(email, recordId));
    }

}
