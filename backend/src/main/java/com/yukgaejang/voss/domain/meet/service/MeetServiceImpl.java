package com.yukgaejang.voss.domain.meet.service;

import com.yukgaejang.voss.domain.meet.repository.MeetJoinRepository;
import com.yukgaejang.voss.domain.meet.repository.MeetRepository;
import com.yukgaejang.voss.domain.meet.repository.entity.Meet;
import com.yukgaejang.voss.domain.meet.repository.entity.MeetJoin;
import com.yukgaejang.voss.domain.meet.service.dto.request.CreateSessionIdRequest;
import com.yukgaejang.voss.domain.meet.service.dto.response.InitMeetRoomResponse;
import com.yukgaejang.voss.domain.meet.service.dto.response.ViewAllMeetRoomResponse;
import com.yukgaejang.voss.domain.member.repository.MemberRepository;
import com.yukgaejang.voss.domain.member.repository.entity.Member;
import com.yukgaejang.voss.infra.openvidu.OpenViduConnection;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MeetServiceImpl implements MeetService{

    private final MeetRepository meetRepository;
    private final MemberRepository memberRepository;
    private final MeetJoinRepository meetJoinRepository;

    @Override
    public Page<ViewAllMeetRoomResponse> getMeetList(int page, int limit) {
        PageRequest pageRequest = PageRequest.of(page, limit);
        Page<Meet> all = meetRepository.findAllList(pageRequest);
        return all.map(o -> new ViewAllMeetRoomResponse(o));
    }

    @Override
    public InitMeetRoomResponse initMeetRoom(CreateSessionIdRequest createSessionIdRequest) {
        // openvidu 세션 생성
        OpenViduConnection openViduConnection = new OpenViduConnection();
        String sessionId = openViduConnection.session();
        Optional<Member> member = memberRepository.findByEmail(createSessionIdRequest.getEmail());
        boolean isPassword = createSessionIdRequest.getPassword()==null?false:true;
        Meet meet = new Meet(createSessionIdRequest.getCategory(), createSessionIdRequest.getTitle(),
                createSessionIdRequest.getMaxCount(), isPassword, false, sessionId, createSessionIdRequest.getPassword());
        meetRepository.save(meet);
        meetJoinRepository.save(new MeetJoin(member.get(), meet));
        return new InitMeetRoomResponse(sessionId);
    }
}
