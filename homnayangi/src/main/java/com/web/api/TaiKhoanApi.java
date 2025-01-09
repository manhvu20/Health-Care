package com.web.api;

import com.web.config.MessageException;
import com.web.entity.DanhMuc;
import com.web.entity.TaiKhoan;
import com.web.repository.TaiKhoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/tai-khoan")
@CrossOrigin("*")
public class TaiKhoanApi {

    @Autowired
    private TaiKhoanRepository taiKhoanRepository;

    @PostMapping("/dang-ky")
    public void dangKy(@RequestBody TaiKhoan taiKhoan){
        Optional<TaiKhoan> tk = taiKhoanRepository.findByEmail(taiKhoan.getEmail());
        if(tk.isPresent()){
            throw new MessageException("Email đã tồn tại");
        }
        taiKhoanRepository.save(taiKhoan);
    }

    @PostMapping("/dang-nhap")
    public TaiKhoan dangNhap(@RequestParam("email") String email, @RequestParam("matkhau") String matkhau){
        Optional<TaiKhoan> tk = taiKhoanRepository.findByEmailAndMatKhau(email, matkhau);
        if(tk.isEmpty()){
            throw new MessageException("Tài khoản hoặc mật khẩu không chính xác");
        }
        return tk.get();
    }

    @PostMapping("/cap-nhat")
    public TaiKhoan capNhat(@RequestBody TaiKhoan taiKhoan){
        Optional<TaiKhoan> tk = taiKhoanRepository.findById(taiKhoan.getId());
        if(tk.isEmpty()){
            throw new MessageException("Không tìm thấy tài khoản");
        }
        taiKhoan.setEmail(tk.get().getEmail());
        taiKhoan.setMatKhau(tk.get().getMatKhau());
        TaiKhoan t = taiKhoanRepository.save(taiKhoan);
        return t;
    }

    @PostMapping("/cap-nhat-mat-khau")
    public void capNhatMatKhau(@RequestParam("mkcu") String mkcu, @RequestParam("mkmoi") String mkmoi, @RequestParam("id") Long id){
        Optional<TaiKhoan> tk = taiKhoanRepository.findById(id);
        if(tk.isEmpty()){
            throw new MessageException("Không tìm thấy tài khoản");
        }
        if(!tk.get().getMatKhau().equals(mkcu)){
            throw new MessageException("Mật khẩu cũ không chính xác");
        }
        tk.get().setMatKhau(mkmoi);
        taiKhoanRepository.save(tk.get());
    }
}
