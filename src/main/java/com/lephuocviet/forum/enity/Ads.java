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
@Table(name = "ads")
public class Ads {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    int desired_views;
    int views;

    @ManyToOne
    @JoinColumn(name = "post_id")
    Posts posts;
}
