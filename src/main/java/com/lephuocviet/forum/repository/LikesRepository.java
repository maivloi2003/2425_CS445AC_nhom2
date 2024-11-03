package com.lephuocviet.forum.repository;

import com.lephuocviet.forum.enity.Likes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface LikesRepository extends JpaRepository<Likes, String> {

    boolean existsByPosts_IdAndUsers_Id(String postId, String userId);

    @Transactional
    void deleteByPosts_IdAndUsers_Id(String postId, String userId);

    Integer countByPosts_Id(String postId);

    boolean existsByUsers_IdAndPosts_Id(String userId, String postId);

}