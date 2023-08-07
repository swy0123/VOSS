package com.yukgaejang.voss.domain.game.service;

import com.yukgaejang.voss.domain.game.exception.NoMatchFileException;
import com.yukgaejang.voss.domain.game.repository.MafiaGameSourceRepository;
import com.yukgaejang.voss.domain.game.repository.entity.MafiaGameSource;
import com.yukgaejang.voss.domain.game.repository.entity.Type;
import com.yukgaejang.voss.domain.game.service.dto.response.GameSourceUploadResponse;
import com.yukgaejang.voss.domain.game.service.dto.response.MafiaGameSourceListResponse;
import com.yukgaejang.voss.domain.member.exception.NoMemberException;
import com.yukgaejang.voss.domain.member.repository.MemberRepository;
import com.yukgaejang.voss.domain.member.repository.entity.Member;
import com.yukgaejang.voss.global.file.service.AwsS3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GameServiceImpl implements GameService{
    private final MemberRepository memberRepository;
    private final MafiaGameSourceRepository mafiaGameSourceRepository;
    private final AwsS3Service awsS3Service;
    private static String dirName = "game-file";

    @Override
    public GameSourceUploadResponse uploadMafiaGameSource(MultipartFile file, String email, Type type) {
        if(file.getOriginalFilename().endsWith(".mp3") || file.getOriginalFilename().endsWith(".wav")) {
            String fileName = awsS3Service.uploadOnlyOneMultiFile(file, dirName);
            Member member = memberRepository.findByEmail(email).orElseThrow(() -> new NoMemberException("사용자가 아닙니다."));
            mafiaGameSourceRepository.save(new MafiaGameSource(member, type, fileName));
            return new GameSourceUploadResponse("업로드 성공");
        } else {
            throw new NoMatchFileException("음성파일이 아닙니다.");
        }
    }

    @Override
    public List<MafiaGameSourceListResponse> getRandomMafiaSourceListLimitCnt(int cnt) {
        return mafiaGameSourceRepository.getRandomMafiaSourceListLimitCnt(cnt)
                .stream()
                .map(o -> new MafiaGameSourceListResponse(o))
                .collect(Collectors.toList());
    }
}
