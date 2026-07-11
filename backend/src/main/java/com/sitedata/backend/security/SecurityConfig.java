package com.sitedata.backend.security;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;



@Configuration
public class SecurityConfig {



private final JwtAuthenticationFilter filter;



public SecurityConfig(
        JwtAuthenticationFilter filter
){

    this.filter = filter;

}





@Bean
public SecurityFilterChain securityFilterChain(
        HttpSecurity http
)
throws Exception {



return http


.cors(cors -> {})


.csrf(csrf -> csrf.disable())



.authorizeHttpRequests(auth -> auth

    .requestMatchers(
            "/api/users/register",
            "/api/auth/login"
    ).permitAll()

    .requestMatchers(
            "/api/customers/**"
    ).authenticated()

    .requestMatchers(
            "/api/admin/**"
    ).authenticated()

    .anyRequest().authenticated()

)

.addFilterBefore(
        filter,
        UsernamePasswordAuthenticationFilter.class
)


.build();


}





@Bean
CorsConfigurationSource corsConfigurationSource(){


CorsConfiguration config =
        new CorsConfiguration();


config.addAllowedOrigin(
        "http://localhost:5173"
);


config.addAllowedHeader("*");


config.addAllowedMethod("*");


UrlBasedCorsConfigurationSource source =
        new UrlBasedCorsConfigurationSource();


source.registerCorsConfiguration(
        "/**",
        config
);


return source;


}


}