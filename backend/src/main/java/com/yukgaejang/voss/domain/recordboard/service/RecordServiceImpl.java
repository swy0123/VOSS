package com.yukgaejang.voss.domain.recordboard.service;

import com.yukgaejang.voss.domain.member.exception.NoMemberException;
import com.yukgaejang.voss.domain.member.repository.MemberRepository;
import com.yukgaejang.voss.domain.member.repository.entity.Member;
import com.yukgaejang.voss.domain.recordboard.exception.NoRecordException;
import com.yukgaejang.voss.domain.recordboard.repository.RecordFileRepository;
import com.yukgaejang.voss.domain.recordboard.repository.RecordRepository;
import com.yukgaejang.voss.domain.recordboard.repository.entity.Record;
import com.yukgaejang.voss.domain.recordboard.repository.entity.RecordFile;
import com.yukgaejang.voss.domain.recordboard.service.dto.request.CreateRecordRequest;
import com.yukgaejang.voss.domain.recordboard.service.dto.request.UpdateRecordRequest;
import com.yukgaejang.voss.domain.recordboard.service.dto.response.*;
import com.yukgaejang.voss.global.file.service.AwsS3Service;
import com.yukgaejang.voss.global.file.service.dto.CreateFileRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class RecordServiceImpl implements RecordService {

    private final RecordRepository recordRepository;
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
    public Page<RecordDetailResponse> getRecordList(String email, Pageable pageable) {
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new NoMemberException("존재하지 않는 사용자입니다."));
        return recordRepository.findAllByIsDeletedFalse(pageable, member.getId());
    }

//    @Override
//    public Page<RecordDetailResponse> getRecordListByNickname(String email, Pageable pageable, String nickname) {
//        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new NoMemberException("존재하지 않는 사용자입니다."));
//        return recordRepository.findAllByMemberNicknameAndIsDeletedFalse(pageable, nickname, member.getId());
//    }
//
//    @Override
//    public Page<RecordDetailResponse> getRecordListByDescription(String email, Pageable pageable, String description) {
//        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new NoMemberException("존재하지 않는 사용자입니다."));
//        return recordRepository.findAllByDescriptionContainingAndIsDeletedFalse(pageable, description, member.getId());
//    }

}
