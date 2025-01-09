package com.web.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "danh_muc")
@Getter
@Setter
public class DanhMuc {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    private String ten;

    @OneToMany(mappedBy = "danhMuc", cascade = CascadeType.REMOVE)
    @JsonIgnoreProperties(value = {"danhMuc"})
    private List<MonAn> monAns;
}
