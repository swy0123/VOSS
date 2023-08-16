package com.yukgaejang.voss.domain.meet.service;

import com.yukgaejang.voss.domain.meet.exception.ExceedMaxNumberException;
import com.yukgaejang.voss.domain.meet.exception.NoMeetRoomException;
import com.yukgaejang.voss.domain.meet.exception.WrongPinException;
import com.yukgaejang.voss.domain.meet.repository.CastingSelectionRepository;
import com.yukgaejang.voss.domain.meet.repository.MeetRepository;
import com.yukgaejang.voss.domain.meet.repository.entity.CastingSelection;
import com.yukgaejang.voss.domain.meet.repository.entity.Meet;
import com.yukgaejang.voss.domain.meet.service.dto.Command;
import com.yukgaejang.voss.domain.meet.service.dto.request.*;
import com.yukgaejang.voss.domain.meet.service.dto.response.*;
import com.yukgaejang.voss.domain.member.exception.NoMemberException;
import com.yukgaejang.voss.domain.member.repository.MemberRepository;
import com.yukgaejang.voss.domain.member.repository.entity.Member;
import com.yukgaejang.voss.domain.practice.repository.CastingRepository;
import com.yukgaejang.voss.domain.practice.repository.ScriptRepository;
import com.yukgaejang.voss.domain.practice.repository.entity.Casting;
import com.yukgaejang.voss.domain.practice.repository.entity.Script;
import com.yukgaejang.voss.domain.practice.serivce.dto.response.ViewScriptLineResponse;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import com.yukgaejang.voss.infra.openvidu.OpenViduClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
@Transactional
public class MeetServiceImpl implements MeetService{

    private final MeetRepository meetRepository;
    private final MemberRepository memberRepository;
    private final ScriptRepository scriptRepository;
    private final CastingRepository castingRepository;
    private final CastingSelectionRepository castingSelectionRepository;
    private final OpenViduClient openViduClient;
    private final EntityManager em;

    @Override
    public List<ViewAllMeetRoomResponse> getMeetList(MeetSearchCondition condition) {
        HashMap<String, List<Long>> map = openViduClient.getSession();
        Set<String> sessionIdList = map.keySet();
        Stream<Meet> notNullMeetList = meetRepository.getMeetListBySessionId(condition, sessionIdList, "script");
        Stream<Meet> nullMeetList = meetRepository.getMeetListBySessionId(condition, sessionIdList, null);
        List<ViewAllMeetRoomResponse> collect = Stream.concat(nullMeetList, notNullMeetList)
                .map(o -> new ViewAllMeetRoomResponse(o))
                .collect(Collectors.toList());
        for (ViewAllMeetRoomResponse response: collect) {
            if(map.containsKey(response.getSessionId())){
                List<Long> integers = map.get(response.getSessionId());
                response.setCurrentCount(integers.get(0));
                response.setCreatedAt(integers.get(1));
            }
        }
        return collect;
    }

    @Override
    public InitMeetRoomResponse initMeetRoom(CreateSessionIdRequest createSessionIdRequest, String email) {
        String sessionId = openViduClient.createSession();
        if(createSessionIdRequest.getPassword().equals("")) {
            createSessionIdRequest.setPassword(null);
        }
        boolean isPassword = createSessionIdRequest.getPassword()==null?false:true;
        Meet meet = new Meet(createSessionIdRequest.getCategory(), createSessionIdRequest.getTitle(),
                createSessionIdRequest.getMaxCount(), isPassword, false, sessionId, createSessionIdRequest.getPassword());
        meetRepository.save(meet);
        return new InitMeetRoomResponse(sessionId, meet.getId());
    }

    @Override
    public JoinMeetRoomResponse joinMeetRoom(JoinMeetRoomRequest joinMeetRoomRequest, String email) {
        Meet meet = getMeetBuJoinMeetRoomRequest(joinMeetRoomRequest);
        String sessionId = meet.getSessionId();

        String token = openViduClient.getJoinMeetToken(meet.getSessionId(), email);
        JoinMeetRoomResponse response = new JoinMeetRoomResponse(token, "입장", meet);
        List<Long> sessionBySessionId = openViduClient.getSessionBySessionId(sessionId);
        response.setCreatedAt(sessionBySessionId.get(0));
        response.setCurrentCount(sessionBySessionId.get(1));
        return response;
    }

    @Override
    public GetStatusResponse leaveMeetRoom(Long meetRoomId, String email) {
//        Member member = memberRepository.findByEmail(email).orElseThrow();
        return new GetStatusResponse("퇴장 성공");
    }

    @Override
    public GetStatusResponse selectScript(SelectScriptRequest selectScriptRequest) {
        if (selectScriptRequest.getScriptId() == 0) {
            meetRepository.setScript(selectScriptRequest, null);
        } else {
            Script script = scriptRepository.findById(selectScriptRequest.getScriptId()).orElseThrow();
            long l = meetRepository.setScript(selectScriptRequest, script);
        }
        return new GetStatusResponse("선택 완료");
    }

    @Override
    public List<ViewScriptLineResponse> selectCasting(List<SelectCastingRequest> selectCastingRequestList) {
        for (SelectCastingRequest selectCastingRequest : selectCastingRequestList) {
            Member member = memberRepository.findById(selectCastingRequest.getMemberId())
                    .orElseThrow(() -> new NoMemberException("회원이 아닙니다"));
            castingSelectionRepository.deleteByMemberId(member.getId());
            Casting casting = castingRepository.findCasting(selectCastingRequest.getCastingId());
            CastingSelection castingSelection = new CastingSelection(member, casting);
            castingSelectionRepository.save(castingSelection);
        }
        em.flush();
        em.clear();
        Casting casting = castingRepository.findCasting(selectCastingRequestList.get(0).getCastingId());
        Long scriptId = casting.getScript().getId();
        return scriptRepository.getScriptLines(scriptId);
    }

    @Override
    public List<GetAllMeetJoinResponse> getMeetJoinList(Long meetRoomId) {
        Meet meet = meetRepository.findByMeetId(meetRoomId).orElseThrow(() -> new NoMeetRoomException("해당 방이 없습니다."));
        List<String> emailList = openViduClient.meetJoinList(meet.getSessionId());
        return memberRepository.findByEmailList(emailList)
                .stream()
                .map(o -> new GetAllMeetJoinResponse(o))
                .collect(Collectors.toList());
    }

    @Override
    public GroupRecordResponse meetRoomRecord(GroupRecordRequest groupRecordRequest) {
        Meet meet = meetRepository.findByMeetId(groupRecordRequest.getMeetRoomId()).orElseThrow();
        if (groupRecordRequest.getCommand() == Command.START) {
            openViduClient.recordStart(meet.getSessionId());
            return new GroupRecordResponse(Command.START, "");
        } else {
            openViduClient.recordStop(meet.getSessionId());
            String recordFile = openViduClient.getRecordFile(meet.getSessionId());
            return new GroupRecordResponse(Command.STOP, recordFile);
        }
    }

    private Meet getMeetBuJoinMeetRoomRequest(JoinMeetRoomRequest joinMeetRoomRequest) {
        Optional<Meet> findMeet = meetRepository.findByMeetId(joinMeetRoomRequest.getMeetRoomId());
        Meet meet = findMeet.orElseThrow(() -> new NoMeetRoomException("해당 방이 없습니다."));

        if(meet.isDeleted()) {
            throw new NoMeetRoomException("해당 방이 없습니다.");
        }
        int currentCount = openViduClient.currentCount(meet.getSessionId());
        if (meet.getMaxCount() <= currentCount) {
            throw new ExceedMaxNumberException("이미 방이 가득 찼습니다.");
        }

        String password = meet.getPassword();
        if (meet.getPassword() != null && !password.equals(joinMeetRoomRequest.getPassword())) {
            throw new WrongPinException("비밀번호가 틀립니다");
        }

        return meet;
    }
}
