package com.example.demo.configs;

import com.example.demo.model.User;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception{
        http.csrf().disable().authorizeRequests()
                .antMatchers(HttpMethod.GET,"/user/all").permitAll()
                .antMatchers(HttpMethod.POST,"/user/add").permitAll()
                .antMatchers(HttpMethod.POST,"/user/login").permitAll()
                .antMatchers(HttpMethod.GET, "/treatments/all" ).permitAll()
                .antMatchers(HttpMethod.GET,"/user/find/{email}").permitAll()
                .antMatchers(HttpMethod.POST,"/user/email").permitAll()
                .antMatchers(HttpMethod.PUT,"/user/updatePacient/{email}/{doctor_id_upd}").permitAll()
                .antMatchers(HttpMethod.PUT, "/user/updatePassword/{email}/{pass}").permitAll()
                .antMatchers(HttpMethod.PUT, "/user/updateTreatment/{email}/{treatment}/{pret}").permitAll()
                .antMatchers(HttpMethod.PUT, "/user/updateDiagnostic/{email}/{diagnostic}").permitAll()
                .antMatchers(HttpMethod.PUT, "/user/updateDinte/{email}/{dinte}").permitAll()
                .antMatchers(HttpMethod.DELETE, "/user/delete/{email}").permitAll()
                .antMatchers(HttpMethod.GET, "/diagnostic/all" ).permitAll()
                .antMatchers(HttpMethod.GET, "/dinte/all" ).permitAll()
                .anyRequest().authenticated();
    }

    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedMethods("*");
    }
}
