package com.lephuocviet.forum.repository;

import com.lephuocviet.forum.enity.Comment_reply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Comment_replyRepository extends JpaRepository<Comment_reply, String> {
}