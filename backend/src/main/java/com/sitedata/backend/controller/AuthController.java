package com.sitedata.backend.controller;


import com.sitedata.backend.dto.LoginRequest;
import com.sitedata.backend.dto.LoginResponse;
import com.sitedata.backend.entity.User;
import com.sitedata.backend.repository.UserRepository;
import com.sitedata.backend.service.UserService;
import com.sitedata.backend.dto.ChangePasswordRequest;
import org.springframework.security.crypto.password.PasswordEncoder;


import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {


    private final UserService userService;

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

   public AuthController(
        UserService userService,
        UserRepository userRepository,
        PasswordEncoder passwordEncoder
) {
    this.userService = userService;
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
}





    @PostMapping("/login")
    public LoginResponse login(
            @RequestBody LoginRequest request
    ){


        String token =
                userService.login(
                        request.getEmail(),
                        request.getPassword()
                );


        User user =
                userRepository.findByEmail(
                        request.getEmail()
                ).get();



        return new LoginResponse(
        token,
        user.getRole(),
        user.getName()
);


    }
    @PutMapping("/change-password")
public String changePassword(

        @RequestBody ChangePasswordRequest request,

        @RequestHeader("email") String email

) {

    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
        throw new RuntimeException("Old password is incorrect");
    }

    user.setPassword(passwordEncoder.encode(request.getNewPassword()));
    userRepository.save(user);

    return "Password Changed Successfully";

}

}