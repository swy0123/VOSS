package com.yukgaejang.voss.global.error;

import com.yukgaejang.voss.domain.auth.exception.DuplicateEmailException;
import com.yukgaejang.voss.domain.auth.exception.NoEmailException;
import com.yukgaejang.voss.domain.auth.exception.WrongTokenException;
import com.yukgaejang.voss.domain.freeboard.exception.NoPostException;
import com.yukgaejang.voss.domain.game.exception.NoMatchFileException;
import com.yukgaejang.voss.domain.meet.exception.ExceedMaxNumberException;
import com.yukgaejang.voss.domain.meet.exception.NoLimitRequest;
import com.yukgaejang.voss.domain.meet.exception.NoMeetRoomException;
import com.yukgaejang.voss.domain.meet.exception.WrongPinException;
import com.yukgaejang.voss.domain.member.exception.MemberEmailDuplicateException;
import com.yukgaejang.voss.global.error.dto.ErrorResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ControllerAdvice {

    @ExceptionHandler(MemberEmailDuplicateException.class)
    public ResponseEntity<ErrorResponse> handleException() {
        ErrorResponse errorResponse = new ErrorResponse("회원가입 정보가 잘못되었습니다.");
        return ResponseEntity.ok(errorResponse);
    }

    @ExceptionHandler(ExceedMaxNumberException.class)
    public ResponseEntity<ErrorResponse> exceedMax() {
        ErrorResponse errorResponse = new ErrorResponse("방이 가득 찼습니다.");
        return ResponseEntity.ok(errorResponse);
    }

    @ExceptionHandler(WrongPinException.class)
    public ResponseEntity<ErrorResponse> wrongPasswordMeetRoom() {
        ErrorResponse errorResponse = new ErrorResponse("비밀번호가 틀립니다.");
        return ResponseEntity.ok(errorResponse);
    }

    @ExceptionHandler(NoMeetRoomException.class)
    public ResponseEntity<ErrorResponse> noMeetRoom() {
        ErrorResponse errorResponse = new ErrorResponse("미팅방이 없습니다.");
        return ResponseEntity.ok(errorResponse);
    }

    @ExceptionHandler(NoPostException.class)
    public ResponseEntity<ErrorResponse> noPost() {
        ErrorResponse errorResponse = new ErrorResponse("게시글이 없습니다.");
        return ResponseEntity.ok(errorResponse);
    }

    @ExceptionHandler(NoLimitRequest.class)
    public ResponseEntity<ErrorResponse> noLimit() {
        ErrorResponse errorResponse = new ErrorResponse("limit가 없습니다.");
        return ResponseEntity.ok(errorResponse);
    }

    @ExceptionHandler(WrongTokenException.class)
    public ResponseEntity<ErrorResponse> wrongToken() {
        ErrorResponse errorResponse = new ErrorResponse("인증번호가 틀립니다");
        return ResponseEntity.ok(errorResponse);
    }

    @ExceptionHandler(NoEmailException.class)
    public ResponseEntity<ErrorResponse> noEmail() {
        ErrorResponse errorResponse = new ErrorResponse("이메일이 존재하지 않습니다");
        return ResponseEntity.ok(errorResponse);
    }

    @ExceptionHandler(DuplicateEmailException.class)
    public ResponseEntity<ErrorResponse> duplicateEmail() {
        ErrorResponse errorResponse = new ErrorResponse("중복 이메일입니다");
        return ResponseEntity.ok(errorResponse);
    }

    @ExceptionHandler(NoMatchFileException.class)
    public ResponseEntity<ErrorResponse> noMatchFile() {
        ErrorResponse errorResponse = new ErrorResponse(".mp3, .wav 파일을 사용해 주세요");
        return ResponseEntity.ok(errorResponse);
    }

}
