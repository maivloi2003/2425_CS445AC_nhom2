package com.lephuocviet.forum.enity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "sales_package")
public class SalesPackage {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    String name;
    Integer price_usd;
    Integer price_vnd;
    Integer description;

    @OneToMany(mappedBy = "salesPackage")
    List<Transaction> transaction;
}
