package com.lephuocviet.forum.enity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "vips")
public class Vips {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    LocalDate date_created;
    LocalDate date_expired;

    @OneToOne
    @JoinColumn(name = "account_id")
    Accounts accounts;
}
