package com.lephuocviet.forum.repository;

import com.lephuocviet.forum.enity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends JpaRepository<Users, String> {

    @Query("Select u " +
            "From Users u " +
            "LEFT JOIN u.accounts a " +
            "WHERE a.username = :username")
    Users findUserByUsername(@Param("username") String username);

    Users findUserByEmail(String email);


}