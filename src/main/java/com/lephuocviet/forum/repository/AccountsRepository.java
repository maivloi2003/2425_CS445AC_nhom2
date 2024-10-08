package com.lephuocviet.forum.repository;

import com.lephuocviet.forum.enity.Accounts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountsRepository extends JpaRepository<Accounts, String> {

    Accounts findAccountsById(String id);

    Accounts findAccountsByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsById(String id);

}