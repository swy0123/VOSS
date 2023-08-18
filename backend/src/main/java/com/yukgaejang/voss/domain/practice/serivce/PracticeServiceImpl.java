package com.yukgaejang.voss.domain.practice.serivce;

import com.yukgaejang.voss.domain.member.exception.NoMemberException;
import com.yukgaejang.voss.domain.member.repository.MemberRepository;
import com.yukgaejang.voss.domain.member.repository.entity.Member;
import com.yukgaejang.voss.domain.practice.repository.StatRepository;
import com.yukgaejang.voss.domain.practice.repository.entity.PracticeType;
import com.yukgaejang.voss.domain.practice.repository.entity.Stat;
import com.yukgaejang.voss.domain.practice.serivce.dto.request.AddStatRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PracticeServiceImpl implements PracticeService {
    private final StatRepository statRepository;
    private final MemberRepository memberRepository;

    @Override
    public void updateStat(AddStatRequest addStatRequest, String email) {
        Member me = memberRepository.findByEmail(email).orElseThrow(() ->
                new NoMemberException("없는 사용자입니다.")
        );

        statRepository.save(new Stat(me, PracticeType.valueOf(addStatRequest.getType())));
    }
}
