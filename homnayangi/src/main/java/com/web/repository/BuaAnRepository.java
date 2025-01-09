package com.web.repository;

import com.web.entity.BuaAn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface BuaAnRepository extends JpaRepository<BuaAn, Long> {
    @Query("select b from BuaAn b where b.taiKhoan.id = ?1")
    List<BuaAn> findByUser(Long UserId);

    @Query("select b from BuaAn b where b.taiKhoan.id = ?1 and b.ngayAn = ?2")
    List<BuaAn> findByUserAndDate(Long UserId, Date date);
}
