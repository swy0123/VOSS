package com.yukgaejang.voss.domain.recordboard.service;

import com.yukgaejang.voss.domain.member.exception.NoMemberException;
import com.yukgaejang.voss.domain.member.repository.MemberRepository;
import com.yukgaejang.voss.domain.member.repository.entity.Member;
import com.yukgaejang.voss.domain.recordboard.exception.NoRecordException;
import com.yukgaejang.voss.domain.recordboard.exception.NoRecordFileException;
import com.yukgaejang.voss.domain.recordboard.repository.RecordFileRepository;
import com.yukgaejang.voss.domain.recordboard.repository.RecordLikeRepository;
import com.yukgaejang.voss.domain.recordboard.repository.RecordRepository;
import com.yukgaejang.voss.domain.recordboard.repository.entity.Record;
import com.yukgaejang.voss.domain.recordboard.repository.entity.RecordFile;
import com.yukgaejang.voss.domain.recordboard.repository.entity.RecordLike;
import com.yukgaejang.voss.domain.recordboard.service.dto.request.CreateRecordRequest;
import com.yukgaejang.voss.domain.recordboard.service.dto.request.UpdateRecordRequest;
import com.yukgaejang.voss.domain.recordboard.service.dto.response.*;
import com.yukgaejang.voss.global.file.service.AwsS3Service;
import com.yukgaejang.voss.global.file.service.dto.CreateFileRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.yukgaejang.voss.domain.recordboard.repository.entity.QRecordLike.recordLike;


@Service
@RequiredArgsConstructor
public class RecordServiceImpl implements RecordService {

    private final RecordRepository recordRepository;
    private final RecordLikeRepository recordLikeRepository;
    private final RecordFileRepository recordFileRepository;
    private final MemberRepository memberRepository;
    private final AwsS3Service awsS3Service;

    private static String dirName = "record-file";

    @Override
    public CreateRecordResponse createRecord(String email, CreateRecordRequest createRecordRequest) {
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new NoMemberException("존재하지 않는 사용자입니다."));
        Record record = new Record(createRecordRequest.getDescription(), member);
        recordRepository.save(record);
        CreateFileRequest file = createRecordRequest.getFile();
        if (file == null) {
            return new CreateRecordResponse(true);
        }
        RecordFile recordFile = new RecordFile(record, file.getOriginalFileName(), file.getSavedFileName(), file.getContentType(), file.getSize());
        recordFileRepository.save(recordFile);
        return new CreateRecordResponse(true);
    }

    @Override
    public UpdateRecordResponse updateRecord(Long id, UpdateRecordRequest updateRecordRequest) {
        Record record = recordRepository.findByIdAndIsDeletedFalse(id);
        if (record == null) {
            throw new NoRecordException("존재하지 않는 글입니다.");
        }
        record.updateRecord(updateRecordRequest.getDescription());
        recordRepository.save(record);
        CreateFileRequest newFile = updateRecordRequest.getNewFile();
        if (newFile != null) {
            RecordFile recordFile = new RecordFile(record, newFile.getOriginalFileName(), newFile.getSavedFileName(), newFile.getContentType(), newFile.getSize());
            recordFileRepository.save(recordFile);
        }
        Long deleteFileId = updateRecordRequest.getDeleteFileId();
        if (deleteFileId != null) {
            RecordFile recordFile = recordFileRepository.findByIdAndIsDeletedFalse(deleteFileId);
            awsS3Service.deleteFile(recordFile.getSavedFileName(), dirName);
            recordFileRepository.delete(recordFile);
        }
        return new UpdateRecordResponse(true);
    }

    @Override
    public Page<RecordDetailResponse> getRecordList(String email, Pageable pageable, String description, String nickname) {
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new NoMemberException("존재하지 않는 사용자입니다."));
        Page<RecordDetailResponse> recordDetailResponses = recordRepository.findAllByConditionAndIsDeletedFalse(pageable, member.getId(), description, nickname);
        for (RecordDetailResponse recordDetailResponse : recordDetailResponses) {
            List<RecordLike> recordLikeList = recordLikeRepository.findByRecordId(recordDetailResponse.getRecordId());
            List<String> likeMembers = new ArrayList<>();
            for (RecordLike recordLike : recordLikeList) {
                likeMembers.add(recordLike.getMember().getNickname() + "(" + recordLike.getMember().getEmail() + ")");
            }
            recordDetailResponse.setLikeMembers(String.join(", ", likeMembers));
        }
        return recordDetailResponses;
    }

    @Override
    public DeleteRecordResponse deleteRecord(Long id) {
        Record record = recordRepository.findByIdAndIsDeletedFalse(id);
        if (record == null) {
            throw new NoRecordException("존재하지 않는 글입니다.");
        }
        record.delete();
        recordRepository.save(record);
        List<RecordLike> recordLikes = recordLikeRepository.findByRecordId(id);
        recordLikeRepository.deleteAll(recordLikes);
        RecordFile recordFile = recordFileRepository.findByRecordIdAndIsDeletedFalse(id);
        if(recordFile == null) {
            throw new NoRecordFileException("존재하지 않는 파일입니다.");
        }
        recordFile.delete();
        recordFileRepository.save(recordFile);
        awsS3Service.deleteFile(recordFile.getSavedFileName(), dirName);
        return new DeleteRecordResponse(true);
    }

    @Override
    public Page<UserRecordListResponse> getMyRecordList(Pageable pageable, String email) {
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new NoMemberException("존재하지 않는 사용자입니다."));
        return recordRepository.findAllByMemberIdAndIsDeletedFalse(pageable, member.getId());
    }

    @Override
    public Page<UserRecordListResponse> getUserRecordList(Pageable pageable, Long memberId) {
        return recordRepository.findAllByMemberIdAndIsDeletedFalse(pageable, memberId);
    }

    @Override
    public UpdateHitResponse updateHitRecord(Long id) {
        Record record = recordRepository.findByIdAndIsDeletedFalse(id);
        if (record == null) {
            throw new NoRecordException("존재하지 않는 글입니다.");
        }
        record.updateHit();
        recordRepository.save(record);
        return new UpdateHitResponse(true);
    }
}
