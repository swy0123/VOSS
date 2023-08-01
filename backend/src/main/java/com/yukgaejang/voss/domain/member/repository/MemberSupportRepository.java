package com.yukgaejang.voss.domain.member.repository;

import com.yukgaejang.voss.domain.member.repository.entity.Member;

import java.util.List;

public interface MemberSupportRepository {

    List<Member> findByEmailList(List<String> emailList);

}
