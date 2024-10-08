package com.lephuocviet.forum.repository;

import com.lephuocviet.forum.enity.Token_invalid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Token_InvalidRepository extends JpaRepository<Token_invalid, String> {
    boolean existsByIdToken(String idToken);
}