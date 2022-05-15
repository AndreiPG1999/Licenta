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
                .antMatchers(HttpMethod.GET,"/user/all/{email}").permitAll()
                .antMatchers(HttpMethod.GET,"/appointment/all").permitAll()
                .antMatchers(HttpMethod.GET,"/formular/all").permitAll()
                .antMatchers(HttpMethod.GET,"/istoric/all").permitAll()
                .antMatchers(HttpMethod.POST,"/user/add").permitAll()
                .antMatchers(HttpMethod.POST,"/formular/add").permitAll()
                .antMatchers(HttpMethod.POST,"/appointment/add").permitAll()
                .antMatchers(HttpMethod.POST,"/istoric/add").permitAll()
                .antMatchers(HttpMethod.POST,"/user/login").permitAll()
                .antMatchers(HttpMethod.GET, "/treatments/all" ).permitAll()
                .antMatchers(HttpMethod.GET,"/user/find/{email}").permitAll()
                .antMatchers(HttpMethod.POST,"/user/email").permitAll()
                .antMatchers(HttpMethod.PUT,"/user/updatePacient/{email}/{doctor_id_upd}").permitAll()
                .antMatchers(HttpMethod.PUT, "/user/updatePassword/{email}/{pass}").permitAll()
                .antMatchers(HttpMethod.PUT, "/user/updateNrTel/{email}/{nr_telefon}").permitAll()
                .antMatchers(HttpMethod.PUT, "/user/updateFirstName/{email}/{first_name}").permitAll()
                .antMatchers(HttpMethod.PUT, "/user/updateLastName/{email}/{last_name}").permitAll()
                .antMatchers(HttpMethod.DELETE, "/user/delete/{email}").permitAll()
                .antMatchers(HttpMethod.DELETE, "/appointment/delete/{email}").permitAll()
                .antMatchers(HttpMethod.GET, "/diagnostic/all" ).permitAll()
                .anyRequest().authenticated();
    }

    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedMethods("*");
    }
}
