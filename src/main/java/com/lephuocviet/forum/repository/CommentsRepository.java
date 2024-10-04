package com.lephuocviet.forum.repository;

import com.lephuocviet.forum.enity.Comments;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentsRepository extends JpaRepository<Comments, String> {
}