package com.web.api;

import com.web.entity.*;
import com.web.repository.MonAnRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mon-an")
@CrossOrigin("*")
public class MonAnApi {

    @Autowired
    private MonAnRepository monAnRepository;


    @GetMapping("/findAll")
    public ResponseEntity<?> findAll(){
        List<MonAn> result = monAnRepository.findAll();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/create-update")
    public void save(@RequestBody MonAn monAn){
        MonAn result = monAnRepository.save(monAn);
    }


    @DeleteMapping("/delete")
    public ResponseEntity<?> delete(@RequestParam("id") Long id){
        monAnRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/findById")
    public ResponseEntity<?> findById(@RequestParam("id") Long id){
        MonAn result = monAnRepository.findById(id).get();
        return new ResponseEntity<>(result,HttpStatus.OK);
    }
}
