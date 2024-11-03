package com.lephuocviet.forum.enity;


import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "transaction")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
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

}
