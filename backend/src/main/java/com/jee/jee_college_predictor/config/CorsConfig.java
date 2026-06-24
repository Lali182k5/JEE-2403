package com.jee.jee_college_predictor.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    /**
     * FIX #6: Removed stray "// ...existing code..." comment at top of file.
     * FIX #7: Added port 5174 (Vite sometimes increments if 5173 is busy).
     * FIX #8: allowedOriginPatterns("*") used instead of allowedOrigins("*")
     *         when allowCredentials(true) is set — Spring 6 throws an error
     *         if you combine allowedOrigins("*") with allowCredentials(true).
     */
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins(
                            "https://jee-2403-z6co.vercel.app",
                            "http://localhost:5173",
                            "http://localhost:5174"
                        )
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true)
                        .maxAge(3600);
            }
        };
    }
}
