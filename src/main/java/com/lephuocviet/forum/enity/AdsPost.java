package com.lephuocviet.forum.enity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "adsPost")
public class AdsPost {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    Integer desired_views;
    Integer views;

    @ManyToOne
    @JoinColumn(name = "posts_id")
    Posts post;
}
