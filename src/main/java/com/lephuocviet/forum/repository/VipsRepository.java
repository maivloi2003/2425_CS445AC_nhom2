package com.lephuocviet.forum.repository;

import com.lephuocviet.forum.enity.Vips;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VipsRepository extends JpaRepository<Vips, String> {
}