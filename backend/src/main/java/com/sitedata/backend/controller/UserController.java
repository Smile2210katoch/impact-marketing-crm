package com.sitedata.backend.controller;


import com.sitedata.backend.entity.User;
import com.sitedata.backend.service.UserService;

import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/users")
@CrossOrigin

public class UserController {


    private final UserService userService;



    public UserController(UserService userService){
        this.userService = userService;
    }



    @PostMapping("/register")
    public User register(@RequestBody User user){

        return userService.registerUser(user);

    }


}