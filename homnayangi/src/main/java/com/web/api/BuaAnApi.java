package com.web.api;

import com.web.entity.BuaAn;
import com.web.entity.BuaAnMonAn;
import com.web.entity.MonAn;
import com.web.entity.dto.BuaAnRequest;
import com.web.entity.enums.TrangThai;
import com.web.repository.BuaAnMonAnRepository;
import com.web.repository.BuaAnRepository;
import com.web.repository.TaiKhoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;

@RestController
@RequestMapping("/api/bua-an")
@CrossOrigin("*")
public class BuaAnApi {

    @Autowired
    private BuaAnRepository buaAnRepository;

    @Autowired
    private BuaAnMonAnRepository buaAnMonAnRepository;

    @Autowired
    private TaiKhoanRepository taiKhoanRepository;

    @PostMapping("/create")
    public void save(@RequestBody BuaAnRequest buaAnRequest){
        BuaAn buaAn = new BuaAn();
        buaAn.setNgayAn(new Date(System.currentTimeMillis()));
        buaAn.setThoiDiem(buaAnRequest.getThoiDiem());
        buaAn.setTrangThai(TrangThai.CHUA_HOAN_THANH);
        buaAn.setTaiKhoan(taiKhoanRepository.findById(buaAnRequest.getUserId()).get());
        BuaAn result = buaAnRepository.save(buaAn);
        for(Long id : buaAnRequest.getListIdMonAn()){
            MonAn m = new MonAn();
            m.setId(id);
            BuaAnMonAn buaAnMonAn = new BuaAnMonAn();
            buaAnMonAn.setBuaAn(result);
            buaAnMonAn.setMonAn(m);
            buaAnMonAnRepository.save(buaAnMonAn);
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> delete(@RequestParam("id") Long id){
        buaAnRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/find-by-user")
    public ResponseEntity<?> findByUser(@RequestParam Long taikhoanId){
        List<BuaAn> result = buaAnRepository.findByUser(taikhoanId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/find-by-user-and-date")
    public ResponseEntity<?> findByUser(@RequestParam Long taikhoanId, @RequestParam(value = "ngayan", required = false) Date ngayAn){
        List<BuaAn> result = null;
        if(ngayAn == null){
            result = buaAnRepository.findByUser(taikhoanId);
        }
        else{
            result = buaAnRepository.findByUserAndDate(taikhoanId, ngayAn);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/bua-an-hom-nay")
    public ResponseEntity<?> buaAnHomNay(@RequestParam Long taikhoanId){
        List<BuaAn> result = buaAnRepository.findByUserAndDate(taikhoanId, new Date(System.currentTimeMillis()));
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/update-trang-thai")
    public void updateTrangThai(@RequestParam TrangThai trangThai, @RequestParam("id") Long id){
        BuaAn buaAn = buaAnRepository.findById(id).get();
        buaAn.setTrangThai(trangThai);
        buaAnRepository.save(buaAn);
    }
}
