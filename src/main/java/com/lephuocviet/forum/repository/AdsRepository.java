package com.lephuocviet.forum.repository;

import com.lephuocviet.forum.enity.AdsPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdsRepository extends JpaRepository<AdsPost, String> {
}