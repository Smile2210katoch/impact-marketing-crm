package com.sitedata.backend.service;


import com.sitedata.backend.entity.User;
import com.sitedata.backend.repository.UserRepository;
import com.sitedata.backend.security.JwtService;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;



@Service
public class UserService {


    private final UserRepository userRepository;

    private final BCryptPasswordEncoder encoder;

    private final JwtService jwtService;



    public UserService(
            UserRepository userRepository,
            BCryptPasswordEncoder encoder,
            JwtService jwtService
    ){

        this.userRepository = userRepository;
        this.encoder = encoder;
        this.jwtService = jwtService;

    }



    public User registerUser(User user){


        user.setPassword(
                encoder.encode(user.getPassword())
        );


        user.setRole("USER");


        return userRepository.save(user);

    }





    public String login(
            String email,
            String password
    ){


        User user =
                userRepository.findByEmail(email)
                .orElseThrow(
                        () -> new RuntimeException("User not found")
                );



        if(
          encoder.matches(
              password,
              user.getPassword()
          )
        ){


            return jwtService.generateToken(email);


        }


        throw new RuntimeException("Invalid password");

    }


}