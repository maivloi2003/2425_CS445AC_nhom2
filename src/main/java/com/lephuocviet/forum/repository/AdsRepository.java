package com.lephuocviet.forum.repository;

import com.lephuocviet.forum.enity.Ads;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdsRepository extends JpaRepository<Ads, String> {
}