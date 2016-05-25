package com.github.harti2006.myapp;

import static org.springframework.boot.SpringApplication.run;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ComponentScan.Filter;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(excludeFilters = @Filter(Configuration.class))
@EnableAutoConfiguration
public class MyApp {

    public static void main(String[] args) {
        run(MyApp.class, args);
    }
}
