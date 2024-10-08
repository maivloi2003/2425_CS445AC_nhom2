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
@Table(name = "likes")
public class Likes {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    LocalDate date_created;


    @ManyToOne
    @JoinColumn(name = "user_id")
    Users users;


    @ManyToOne
    @JoinColumn(name = "post_id")
    Posts posts;
}
