package com.web.repository;

import com.web.entity.TaiKhoan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TaiKhoanRepository extends JpaRepository<TaiKhoan, Long> {
    @Query("select t from TaiKhoan t where t.email = ?1")
    public Optional<TaiKhoan> findByEmail(String email);

    @Query("select t from TaiKhoan t where t.email = ?1 and t.matKhau = ?2")
    public Optional<TaiKhoan> findByEmailAndMatKhau(String email, String matKhau);
}
