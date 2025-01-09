package com.web.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("")
public class AllController {

    @RequestMapping(value = {"/index","/"}, method = RequestMethod.GET)
    public String index() {
        return "index.html";
    }

    @RequestMapping(value = {"/lichsuanuong"}, method = RequestMethod.GET)
    public String lichsuanuong() {
        return "lichsuanuong.html";
    }

    @RequestMapping(value = {"/loaimonan"}, method = RequestMethod.GET)
    public String loaimonan() {
        return "loaimonan.html";
    }

    @RequestMapping(value = {"/login"}, method = RequestMethod.GET)
    public String login() {
        return "login.html";
    }

    @RequestMapping(value = {"/monan"}, method = RequestMethod.GET)
    public String monan() {
        return "monan.html";
    }

    @RequestMapping(value = {"/regis"}, method = RequestMethod.GET)
    public String regis() {
        return "regis.html";
    }

    @RequestMapping(value = {"/thongtincanhan"}, method = RequestMethod.GET)
    public String thongtincanhan() {
        return "thongtincanhan.html";
    }
}
