package com.lephuocviet.forum.repository;

import com.lephuocviet.forum.enity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsersRepository extends JpaRepository<Users, String> {

    @Query("Select u " +
            "From Users u " +
            "LEFT JOIN u.accounts a " +
            "WHERE a.username = :username")
    Optional<Users> findUserByUsername(@Param("username") String username);

    Optional<Users> findUserByEmail(String email);

    boolean existsByEmail(String email);

    Optional<Users> findUsersById(String id);

    @Query("SELECT u FROM Users u WHERE LOWER(u.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Users> findUsersByName(@Param("name") String name);





}