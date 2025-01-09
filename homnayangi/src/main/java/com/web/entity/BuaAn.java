package com.web.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.web.entity.enums.TrangThai;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "bua_an")
@Getter
@Setter
public class BuaAn {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    private Date ngayAn;

    private String thoiDiem;

    private TrangThai trangThai;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getNgayAn() {
        return ngayAn;
    }

    public void setNgayAn(Date ngayAn) {
        this.ngayAn = ngayAn;
    }

    public String getThoiDiem() {
        return thoiDiem;
    }

    public void setThoiDiem(String thoiDiem) {
        this.thoiDiem = thoiDiem;
    }

    public TrangThai getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(TrangThai trangThai) {
        this.trangThai = trangThai;
    }

    public TaiKhoan getTaiKhoan() {
        return taiKhoan;
    }

    public void setTaiKhoan(TaiKhoan taiKhoan) {
        this.taiKhoan = taiKhoan;
    }

    public List<BuaAnMonAn> getBuaAnMonAns() {
        return buaAnMonAns;
    }

    public void setBuaAnMonAns(List<BuaAnMonAn> buaAnMonAns) {
        this.buaAnMonAns = buaAnMonAns;
    }

    @ManyToOne
    @JoinColumn(name = "taikhoan_id")
    private TaiKhoan taiKhoan;

    @OneToMany(mappedBy = "buaAn", cascade = CascadeType.REMOVE)
    @JsonManagedReference
    private List<BuaAnMonAn> buaAnMonAns = new ArrayList<>();

}
