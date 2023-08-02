package com.yukgaejang.voss.domain.freeboard.controller;

import com.yukgaejang.voss.domain.freeboard.repository.entity.PostFile;
import com.yukgaejang.voss.domain.freeboard.service.AwsS3Service;
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
    private final AwsS3Service awsS3Service;
    private static String dirName = "post-img";

    @PostMapping("/upload")
    public ResponseEntity<List<PostFile>> uploadMultipleFile(@RequestPart(required = false) List<MultipartFile> imageFiles) throws IOException {
        return ResponseEntity.ok(awsS3Service.uploadFile(imageFiles, dirName));
    }

}