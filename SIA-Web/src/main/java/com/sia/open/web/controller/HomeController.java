package com.sia.open.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@SuppressWarnings("unchecked")
public class HomeController {

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String home(ModelMap modelMap) {

        return "home";
    }

    @RequestMapping(value = "/loginpage", method = RequestMethod.GET)
    public String loginPage(ModelMap modelMap) {

        return "loginpage";
    }
}
