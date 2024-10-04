package com.lephuocviet.forum.enity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

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
    Date date_created;
    Date date_expired;

    @OneToOne
    @JoinColumn(name = "account_id")
    Accounts accounts;
}
