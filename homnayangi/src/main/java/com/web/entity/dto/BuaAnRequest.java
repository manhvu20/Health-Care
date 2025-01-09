package com.web.entity.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class BuaAnRequest {

    private String thoiDiem;

    private Long userId;

    private List<Long> listIdMonAn = new ArrayList<>();

    public String getThoiDiem() {
        return thoiDiem;
    }

    public void setThoiDiem(String thoiDiem) {
        this.thoiDiem = thoiDiem;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public List<Long> getListIdMonAn() {
        return listIdMonAn;
    }

    public void setListIdMonAn(List<Long> listIdMonAn) {
        this.listIdMonAn = listIdMonAn;
    }
}
