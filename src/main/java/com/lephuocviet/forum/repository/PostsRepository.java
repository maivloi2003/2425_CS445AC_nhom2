package com.lephuocviet.forum.repository;

import com.lephuocviet.forum.enity.Posts;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostsRepository extends JpaRepository<Posts, String> {
}