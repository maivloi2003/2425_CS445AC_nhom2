package com.lephuocviet.forum.enity;


import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "accounts")
public class Accounts {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    String username;
    String password;
    boolean active;
    boolean status;
    @ManyToMany
    Set<Roles> roles;

    @OneToOne(mappedBy = "accounts")
    Vips vips;

    @OneToMany(mappedBy = "accounts")
    List<Transaction> transactions;

    @OneToOne(mappedBy = "accounts")
    Users users;
}
