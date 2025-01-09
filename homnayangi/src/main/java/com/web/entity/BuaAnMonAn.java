package com.web.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "bua_an_mon_an")
@Getter
@Setter
public class BuaAnMonAn {
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BuaAn getBuaAn() {
        return buaAn;
    }

    public void setBuaAn(BuaAn buaAn) {
        this.buaAn = buaAn;
    }

    public MonAn getMonAn() {
        return monAn;
    }

    public void setMonAn(MonAn monAn) {
        this.monAn = monAn;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "bua_an_id")
    @JsonBackReference
    private BuaAn buaAn;

    @ManyToOne
    @JoinColumn(name = "mon_an_id")
    private MonAn monAn;
}
