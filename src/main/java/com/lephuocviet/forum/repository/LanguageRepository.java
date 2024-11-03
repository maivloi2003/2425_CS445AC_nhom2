package com.lephuocviet.forum.repository;

import com.lephuocviet.forum.enity.Language;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LanguageRepository extends JpaRepository<Language, String> {

    Optional<Language> findByName(String name);

    boolean existsByName(String name);


}