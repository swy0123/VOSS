package com.yukgaejang.voss.domain.member.repository;

import com.yukgaejang.voss.domain.member.repository.entity.Member;
import com.yukgaejang.voss.domain.member.service.dto.response.GetMemberList;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface MemberSupportRepository {

    List<Member> findByEmailList(List<String> emailList);

    Page<GetMemberList> findMemberListByNicknameAndIsDeletedFalse(String keyword, Pageable pageable);
}
