package com.lephuocviet.forum.repository;

import com.lephuocviet.forum.enity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, String> {
}