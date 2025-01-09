package com.web.api;

import com.web.entity.DanhMuc;
import com.web.repository.DanhMucRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/danh-muc")
@CrossOrigin("*")
public class DanhMucApi {

    @Autowired
    private DanhMucRepository danhMucRepository;


    @GetMapping("/findAll")
    public ResponseEntity<?> findAll(){
        List<DanhMuc> categories = danhMucRepository.findAll();
        return new ResponseEntity<>(categories,HttpStatus.OK);
    }

    @PostMapping("/create-update")
    public ResponseEntity<?> save(@RequestBody DanhMuc category){
        DanhMuc result = danhMucRepository.save(category);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }


    @DeleteMapping("/delete")
    public ResponseEntity<?> delete(@RequestParam("id") Long id){
        danhMucRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/findById")
    public ResponseEntity<?> findById(@RequestParam("id") Long id){
        DanhMuc result = danhMucRepository.findById(id).get();
        return new ResponseEntity<>(result,HttpStatus.OK);
    }
}
