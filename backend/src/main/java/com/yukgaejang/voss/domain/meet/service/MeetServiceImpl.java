package com.yukgaejang.voss.domain.meet.service;

import com.yukgaejang.voss.domain.meet.exception.ExceedMaxNumberException;
import com.yukgaejang.voss.domain.meet.exception.NoLimitRequest;
import com.yukgaejang.voss.domain.meet.exception.NoMeetRoomException;
import com.yukgaejang.voss.domain.meet.exception.WrongPinException;
import com.yukgaejang.voss.domain.meet.repository.MeetJoinRepository;
import com.yukgaejang.voss.domain.meet.repository.MeetRepository;
import com.yukgaejang.voss.domain.meet.repository.entity.Meet;
import com.yukgaejang.voss.domain.meet.repository.entity.MeetJoin;
import com.yukgaejang.voss.domain.meet.service.dto.MeetJoinDto;
import com.yukgaejang.voss.domain.meet.service.dto.request.*;
import com.yukgaejang.voss.domain.meet.service.dto.response.*;
import com.yukgaejang.voss.domain.member.exception.NoMemberException;
import com.yukgaejang.voss.domain.member.repository.MemberRepository;
import com.yukgaejang.voss.domain.member.repository.entity.Member;
import com.yukgaejang.voss.domain.practice.repository.CastingRepository;
import com.yukgaejang.voss.domain.practice.repository.ScriptRepository;
import com.yukgaejang.voss.domain.practice.repository.entity.Casting;
import com.yukgaejang.voss.domain.practice.repository.entity.Script;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import com.yukgaejang.voss.infra.openvidu.OpenViduClient;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class MeetServiceImpl implements MeetService{

    private final MeetRepository meetRepository;
    private final MemberRepository memberRepository;
    private final MeetJoinRepository meetJoinRepository;
    private final ScriptRepository scriptRepository;
    private final CastingRepository castingRepository;
    private final EntityManager em;

    @Override
    public Page<ViewAllMeetRoomResponse> getMeetList(MeetSearchCondition condition) {
        if(condition.getLimit() == 0 ) {
            throw new NoLimitRequest("limit 없음");
        }
        PageRequest pageRequest = PageRequest.of(condition.getPage(), condition.getLimit());
        Page<Meet> all = meetRepository.getMeetList(condition, pageRequest);
        return all.map(o -> new ViewAllMeetRoomResponse(o));
    }

    @Override
    public InitMeetRoomResponse initMeetRoom(CreateSessionIdRequest createSessionIdRequest, String email) {
        // openvidu 세션 생성
        OpenViduClient openViduClient = new OpenViduClient();
        String sessionId = openViduClient.session();
        Optional<Member> findMember = memberRepository.findByEmail(email);
        boolean isPassword = createSessionIdRequest.getPassword()==null?false:true;
        Meet meet = new Meet(createSessionIdRequest.getCategory(), createSessionIdRequest.getTitle(),
                createSessionIdRequest.getMaxCount(), isPassword, false, sessionId, createSessionIdRequest.getPassword());
        meetRepository.save(meet);
        Member member = findMember.orElseThrow(() -> new NoMemberException("회원이 아닙니다."));
        meetJoinRepository.save(new MeetJoin(member, meet));
        em.flush();
        em.clear();
        return new InitMeetRoomResponse(sessionId, meet.getId());
    }

    @Override
    public JoinMeetRoomResponse joinMeetRoom(JoinMeetRoomRequest joinMeetRoomRequest, String email) {
        Optional<Meet> findMeet = meetRepository.findByMeetId(joinMeetRoomRequest.getMeetRoomId());
        Meet meet = findMeet.orElseThrow(() -> new NoMeetRoomException("해당 방이 없습니다."));
        if(meet.isDeleted()) throw new NoMeetRoomException("해당 방이 없습니다.");
        int maxCount = meet.getMaxCount();
        if (maxCount <= meet.getMeetJoins().size()) {
            throw new ExceedMaxNumberException("이미 방이 가득 찼습니다.");
        }

        String password = meet.getPassword();
        if (password != null) {
            if (!password.equals(joinMeetRoomRequest.getPassword())) {
                throw new WrongPinException("비밀번호가 틀립니다");
            }
        }

        Optional<Member> findMember = memberRepository.findByEmail(email);
        Member member = findMember.orElseThrow(() -> new NoMemberException("회원이 아닙니다."));
        meetJoinRepository.save(new MeetJoin(member, meet));
        em.flush();
        em.clear();
        return new JoinMeetRoomResponse(meet.getSessionId(), "입장");
    }

    @Override
    public GetStatusResponse leaveMeetRoom(Long meetRoomId, String email) {
        Member member = memberRepository.findByEmail(email).orElseThrow();
        MeetJoin meetJoin = meetJoinRepository.findByMemberId(member.getId());
        meetJoinRepository.delete(meetJoin);
        em.flush();
        em.clear();
        Long meetRoodId = meetJoin.getMeet().getId();
        if(meetJoinRepository.findByMeetId(meetRoodId).size() == 0) {
            meetRepository.leaveMeetRoom(meetRoodId);
        }
        return new GetStatusResponse("퇴장 성공");
    }

    @Override
    public GetStatusResponse selectScript(SelectScriptRequest selectScriptRequest) {
        Script script = scriptRepository.findById(selectScriptRequest.getScriptId()).orElseThrow();
        long l = meetRepository.setScript(selectScriptRequest, script);
        return new GetStatusResponse("선택 완료");
    }

    @Override
    public void selectCasting(List<SelectCastingRequest> selectCastingRequestList) {
        meetJoinRepository.resetCasting(selectCastingRequestList.get(0).getMeetRoomId());
        for (SelectCastingRequest selectCastingRequest : selectCastingRequestList) {
            Member member = memberRepository.findById(selectCastingRequest.getMemberId()).orElseThrow();
            Casting casting = castingRepository.findCasting(selectCastingRequest.getCastingId());
            meetJoinRepository.selectCasting(member.getId(), selectCastingRequest.getMeetRoomId(), casting);
        }
        em.flush();
        em.clear();
    }

    @Override
    public GetAllMeetJoinResponse getMeetJoinList(Long meetRoomId) {
        List<MeetJoin> meetJoinList = meetJoinRepository.findByMeetId(meetRoomId);
        List<MeetJoinDto> meetJoinDtoList = meetJoinList.stream()
                .map(o -> new MeetJoinDto(o))
                .collect(Collectors.toList());
        return new GetAllMeetJoinResponse(meetJoinDtoList);
    }
}
