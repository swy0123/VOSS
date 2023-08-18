package com.yukgaejang.voss.domain.game.service;

import com.yukgaejang.voss.domain.game.exception.NoMatchFileException;
import com.yukgaejang.voss.domain.game.repository.MafiaGameScoreRepository;
import com.yukgaejang.voss.domain.game.repository.MafiaGameSourceRepository;
import com.yukgaejang.voss.domain.game.repository.entity.MafiaGameScore;
import com.yukgaejang.voss.domain.game.repository.entity.MafiaGameSource;
import com.yukgaejang.voss.domain.game.repository.entity.Type;
import com.yukgaejang.voss.domain.game.service.dto.request.SearchCondition;
import com.yukgaejang.voss.domain.game.service.dto.response.GameSourceUploadResponse;
import com.yukgaejang.voss.domain.game.service.dto.response.MafiaGameScoreListResponse;
import com.yukgaejang.voss.domain.game.service.dto.response.MafiaGameSourceListResponse;
import com.yukgaejang.voss.domain.game.service.dto.response.StatusResponse;
import com.yukgaejang.voss.domain.member.exception.NoMemberException;
import com.yukgaejang.voss.domain.member.repository.MemberRepository;
import com.yukgaejang.voss.domain.member.repository.entity.Member;
import com.yukgaejang.voss.global.file.service.AwsS3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class GameServiceImpl implements GameService{
    private final MemberRepository memberRepository;
    private final MafiaGameSourceRepository mafiaGameSourceRepository;
    private final MafiaGameScoreRepository mafiaGameScoreRepository;
    private final AwsS3Service awsS3Service;
    private static String dirName = "game-file";

    @Override
    public GameSourceUploadResponse uploadMafiaGameSource(MultipartFile file, String email, Type type) {
        if (file.getContentType().startsWith("audio")) {
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
        List<MafiaGameSourceListResponse> memberTypeList = mafiaGameSourceRepository.getRandomMafiaSourceListWhereTypeLimitCnt(3)
                .stream()
                .map(o -> new MafiaGameSourceListResponse(o))
                .collect(Collectors.toList());
        List<MafiaGameSourceListResponse> noMemberTypeList = mafiaGameSourceRepository.getRandomMafiaSourceListWhereTypeNotMemberLimitCnt(cnt)
                .stream()
                .map(o -> new MafiaGameSourceListResponse(o))
                .collect(Collectors.toList());
        Random random = new Random();
        for (int i = 0; i < 3; i++) {
            int randomInt = random.nextInt(cnt);
            if (noMemberTypeList.get(randomInt).getType() != Type.MEMBER) {
                noMemberTypeList.set(randomInt, memberTypeList.get(i));
            }
        }
        return noMemberTypeList;
    }

    @Override
    public StatusResponse addMafiaGameScore(String email, int score) {
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new NoMemberException("사용자가 아닙니다."));
        mafiaGameScoreRepository.save(new MafiaGameScore(member, score));
        return new StatusResponse("점수등록을 완료했습니다.");
    }

    @Override
    public Page<MafiaGameScoreListResponse> getMafiaGameScoreList(String email, SearchCondition searchCondition) {
        PageRequest pageRequest = PageRequest.of(searchCondition.getPage(), searchCondition.getLimit());
        return mafiaGameScoreRepository.getScoreHistoryByMemberId(email, pageRequest, searchCondition);
    }
}
