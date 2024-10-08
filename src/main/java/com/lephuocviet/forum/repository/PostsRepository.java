package com.lephuocviet.forum.repository;

import com.lephuocviet.forum.enity.Posts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostsRepository extends JpaRepository<Posts, String> {
}