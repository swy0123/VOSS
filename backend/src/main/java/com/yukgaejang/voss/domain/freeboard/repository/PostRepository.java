package com.yukgaejang.voss.domain.freeboard.repository;

import com.yukgaejang.voss.domain.freeboard.repository.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

//    @Query(value = "select distinct p from Post p" +
//            " join fetch p.postComments pc " +
//            "where p.isDeleted = false ", countQuery = "select count (p) from Post p")
    @Query(value = "select distinct p from Post p " +
            "where p.isDeleted = 0 ")
    public Page<Post> findAllByIsDeletedFalse(Pageable pageable);
}
