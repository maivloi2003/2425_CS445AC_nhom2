package com.lephuocviet.forum.repository;

import com.lephuocviet.forum.enity.Notices;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoticesRepository extends JpaRepository<Notices, String> {
}