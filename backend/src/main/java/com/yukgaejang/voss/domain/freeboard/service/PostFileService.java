package com.yukgaejang.voss.domain.freeboard.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public interface PostFileService {
    String uploadFile(List<MultipartFile> uploadImgs, List<MultipartFile> uploadVideos) throws IOException;
}
