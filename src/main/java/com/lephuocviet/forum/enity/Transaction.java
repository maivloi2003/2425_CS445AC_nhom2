package com.lephuocviet.forum.enity;


import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "transaction")
public class Transaction {
    @Id
    String id;
    LocalDate date_created;
    BigDecimal amount;
    String unit;
    String content;
    String type;
    boolean status;

    @ManyToOne
    @JoinColumn(name = "account_id")
    Accounts accounts;

    @ManyToOne
    @JoinColumn(name = "salesPackage_id")
    SalesPackage salesPackage;
}

