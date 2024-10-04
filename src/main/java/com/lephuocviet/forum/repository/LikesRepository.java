package com.lephuocviet.forum.repository;

import com.lephuocviet.forum.enity.Likes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikesRepository extends JpaRepository<Likes, String> {
}