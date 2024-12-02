package com.lephuocviet.forum.repository;

import com.lephuocviet.forum.enity.Roles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RolesRepository extends JpaRepository<Roles, String> {
    Optional<Roles> findRolesByName(String name);

}