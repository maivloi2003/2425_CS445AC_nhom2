package com.lephuocviet.forum.repository;

import com.lephuocviet.forum.enity.Mail_sender;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Mail_SenderRepository extends JpaRepository<Mail_sender, String> {

    boolean existsByEmail(String email);

    boolean existsAllById(String id);
}