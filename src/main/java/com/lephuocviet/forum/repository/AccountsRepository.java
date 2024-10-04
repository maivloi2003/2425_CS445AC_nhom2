package com.lephuocviet.forum.repository;

import com.lephuocviet.forum.enity.Accounts;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountsRepository extends JpaRepository<Accounts, String> {
}