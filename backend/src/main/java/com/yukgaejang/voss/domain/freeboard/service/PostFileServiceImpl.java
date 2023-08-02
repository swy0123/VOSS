package com.yukgaejang.voss.domain.freeboard.service;

import com.yukgaejang.voss.domain.freeboard.repository.PostFileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PostFileServiceImpl implements PostFileService {

    private final PostFileRepository postFileRepository;

    @Override
    public String uploadFile(List<MultipartFile> imageFiles, List<MultipartFile> attachFiles) throws IOException {
        String savedFilename = "";
        // 1. 파일 저장 경로 설정 : 실제 서비스되는 위치(프로젝트 외부에 저장)
        String uploadPath = "/Users/suyeon/filepractice/";
        // 여러 개의 원본 파일을 저장할 리스트 생성
        ArrayList<String> originalFilenameList = new ArrayList<String>();
        for(MultipartFile file : imageFiles) {
            // 2. 원본 파일 이름 알아오기
            String originalFilename = file.getOriginalFilename();
            // 3. 파일 이름을 리스트에 추가
            originalFilenameList.add(originalFilename);
            // 4. 파일 이름 중복되지 않게 이름 변경(서버에 저장할 이름) UUID 사용
            UUID uuid = UUID.randomUUID();
            savedFilename = uuid.toString() + "_" + originalFilename;
            // 5. 파일 생성
            File file1 = new File(uploadPath + savedFilename);
            // 6. 서버로 전송
            file.transferTo(file1);
        }
        for(MultipartFile file : attachFiles) {
            // 2. 원본 파일 이름 알아오기
            String originalFilename = file.getOriginalFilename();
            // 3. 파일 이름을 리스트에 추가
            originalFilenameList.add(originalFilename);
            // 4. 파일 이름 중복되지 않게 이름 변경(서버에 저장할 이름) UUID 사용
            UUID uuid = UUID.randomUUID();
            savedFilename = uuid.toString() + "_" + originalFilename;
            // 5. 파일 생성
            File file1 = new File(uploadPath + savedFilename);
            // 6. 서버로 전송
            file.transferTo(file1);
        }
        return "upload/fileUploadMultipleResult";

    }
}
