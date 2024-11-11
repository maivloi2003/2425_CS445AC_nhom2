package com.lephuocviet.forum.repository;

import com.lephuocviet.forum.enity.SalesPackage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SalesPackageRepository extends JpaRepository<SalesPackage,String> {

    @Query("SELECT COUNT(ads) > 0 FROM SalesPackage ads WHERE ads.price_vnd = :vnd OR ads.price_usd = :usd")
    boolean existAdsPackageByPrice_vndOrPrice_usd(@Param("vnd") Integer vnd, @Param("usd") Integer usd);


    Optional<SalesPackage> findAdsPackageByName(String name);
}
