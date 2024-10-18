package com.lephuocviet.forum.repository;

import com.lephuocviet.forum.enity.Language;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LanguageRepository extends JpaRepository<Language, String> {

    Language findByName(String name);

    boolean existsByName(String name);
}