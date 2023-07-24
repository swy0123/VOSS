package com.yukgaejang.voss.domain.meet.service;

import com.yukgaejang.voss.domain.meet.service.dto.response.MeetResponseDto;
import com.yukgaejang.voss.domain.meet.service.dto.request.MeetRequestDto;
import org.springframework.data.domain.Page;

public interface MeetService {

    Page<MeetResponseDto> list(MeetRequestDto meetRequestDto);
}
