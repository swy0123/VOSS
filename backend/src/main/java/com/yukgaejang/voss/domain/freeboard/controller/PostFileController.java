package com.yukgaejang.voss.domain.freeboard.controller;

import com.yukgaejang.voss.domain.freeboard.service.PostFileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/file")
public class PostFileController {

    private final PostFileService postFileService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadMultipleFile(@RequestPart(required = false) List<MultipartFile> uploadImgs,
                                                     @RequestPart(required = false) List<MultipartFile> uploadVideos) throws IOException {
        String a = postFileService.uploadFile(uploadImgs, uploadVideos);

        return ResponseEntity.ok(a);
    }

}