package com.sitedata.backend.security;



import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import org.springframework.stereotype.Service;


import java.util.Date;



@Service
public class JwtService {


    private final String SECRET_KEY =
            "mysecretkeymysupersecretkey123456789";





    public String generateToken(String email){


        return Jwts.builder()

                .subject(email)

                .issuedAt(new Date())

                .expiration(
                    new Date(
                    System.currentTimeMillis()
                    +86400000)
                )

                .signWith(
                    Keys.hmacShaKeyFor(
                    SECRET_KEY.getBytes())
                )

                .compact();

    }





    public String extractEmail(
            String token
    ){


        return Jwts.parser()

                .verifyWith(
                    Keys.hmacShaKeyFor(
                    SECRET_KEY.getBytes())
                )

                .build()

                .parseSignedClaims(token)

                .getPayload()

                .getSubject();


    }

}