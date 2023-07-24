package com.yukgaejang.voss.domain.meet.service;

import com.yukgaejang.voss.domain.meet.repository.MeetRepository;
import com.yukgaejang.voss.domain.meet.repository.entity.Meet;
import com.yukgaejang.voss.domain.meet.service.dto.response.ViewAllMeetRoomResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MeetServiceImpl implements MeetService{

    private final MeetRepository meetRepository;

    @Override
    public Page<ViewAllMeetRoomResponse> getMeetList(int page, int limit) {
        PageRequest pageRequest = PageRequest.of(page, limit);
        Page<Meet> all = meetRepository.findAllList(pageRequest);
        return all.map(o -> new ViewAllMeetRoomResponse(o));
    }
}
