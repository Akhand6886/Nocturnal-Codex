---
title: "Spring Security"
description: "The industry standard for securing Java-based enterprise applications. Authentication, Authorization, and protection against common attacks."
---

## Introduction to Security

Spring Security is a powerful and highly customizable authentication and access-control framework. It is the de-facto standard for securing Spring-based applications.

### 1. Authentication vs. Authorization
- **Authentication**: Verifying *who* a user is (e.g., login with username/password).
- **Authorization**: Verifying *what* a user is allowed to do (e.g., "ADMIN" can delete users, "USER" can only view them).

### 2. The Filter Chain
Spring Security works as a series of Servlet Filters that intercept incoming requests. 
- **SecurityFilterChain**: A bean that defines which filters are active and how requests should be secured.
- **UsernamePasswordAuthenticationFilter**: Handles traditional login.
- **JwtAuthenticationFilter**: Custom filter for stateless API security.

---

## Modern Security Patterns

### 1. JWT (JSON Web Tokens)
For modern, stateless microservices, we often use JWTs instead of server-side sessions.
- The server issues a signed token upon successful login.
- The client sends this token in the `Authorization` header for every subsequent request.
- The server verifies the signature without needing to query a database.

### 2. OAuth2 and OpenID Connect (OIDC)
Allowing users to log in using external providers (Google, GitHub).
- **Resource Owner**: The user.
- **Client**: Your application.
- **Authorization Server**: Google/GitHub.
- **Resource Server**: The API you are protecting.

### 3. Method-Level Security
You can secure individual methods using annotations.
- `@PreAuthorize("hasRole('ADMIN')")`: Checks the user's role before executing the method.

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/public/**").permitAll()
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()));
        
        return http.build();
    }
}
```

### 4. Protection Against Attacks
Spring Security provides built-in protection against:
- **CSRF** (Cross-Site Request Forgery)
- **CORS** (Cross-Origin Resource Sharing)
- **Session Fixation**
- **Security Headers** (X-Content-Type-Options, HSTS)
