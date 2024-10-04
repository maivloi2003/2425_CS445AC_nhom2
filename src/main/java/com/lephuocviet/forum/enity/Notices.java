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
@Table(name = "notices")
public class Notices {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    String message;
    Date date_created;
    boolean status;
    @ManyToOne
    @JoinColumn(name = "user_id")
    Users users;

}
