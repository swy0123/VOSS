package com.yukgaejang.voss.domain.recordboard.service;

import com.yukgaejang.voss.domain.freeboard.exception.DupliacteLikeException;
import com.yukgaejang.voss.domain.member.repository.MemberRepository;
import com.yukgaejang.voss.domain.member.repository.entity.Member;
import com.yukgaejang.voss.domain.notification.service.NotificationService;
import com.yukgaejang.voss.domain.recordboard.exception.NoRecordException;
import com.yukgaejang.voss.domain.recordboard.repository.RecordLikeRepository;
import com.yukgaejang.voss.domain.recordboard.repository.RecordRepository;
import com.yukgaejang.voss.domain.recordboard.repository.entity.Record;
import com.yukgaejang.voss.domain.recordboard.repository.entity.RecordLike;
import com.yukgaejang.voss.domain.recordboard.service.dto.response.CreateRecordLikeResponse;
import com.yukgaejang.voss.domain.recordboard.service.dto.response.DeleteRecordLikeResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RecordLikeServiceImpl implements RecordLikeService {

    private final NotificationService notificationService;
    private final RecordRepository recordRepository;
    private final RecordLikeRepository recordLikeRepository;
    private final MemberRepository memberRepository;

    @Override
    public CreateRecordLikeResponse createRecordLike(String email, Long recordId) {
        Record record = recordRepository.findByIdAndIsDeletedFalse(recordId);
        if(record == null) {
            throw new NoRecordException("존재하지 않는 글입니다.");
        }
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new NoRecordException("존재하지 않는 사용자입니다."));
        if(recordLikeRepository.existsByRecordIdAndMemberId(recordId, member.getId())) {
             throw new DupliacteLikeException("이미 좋아요를 누른 글입니다.");
        }
        RecordLike recordLike = new RecordLike(record, member);
        recordLikeRepository.save(recordLike);
        notificationService.notifyRecordLike(recordLike);
        return new CreateRecordLikeResponse(true);
    }

    @Override
    public DeleteRecordLikeResponse deleteRecordLike(String email, Long recordId) {
        Record record = recordRepository.findByIdAndIsDeletedFalse(recordId);
        if(record == null) {
            throw new NoRecordException("존재하지 않는 글입니다.");
        }
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new NoRecordException("존재하지 않는 사용자입니다."));
        RecordLike recordLike = recordLikeRepository.findByRecordIdAndMemberId(recordId, member.getId());
        recordLikeRepository.delete(recordLike);
        return new DeleteRecordLikeResponse(true);
    }
}
