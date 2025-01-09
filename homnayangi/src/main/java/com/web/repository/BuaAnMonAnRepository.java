package com.web.repository;

import com.web.entity.BuaAnMonAn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BuaAnMonAnRepository extends JpaRepository<BuaAnMonAn, Long> {
}
