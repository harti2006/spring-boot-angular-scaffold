package example.config;

import static org.springframework.boot.autoconfigure.security.SecurityProperties.ACCESS_OVERRIDE_ORDER;
import static org.springframework.http.HttpMethod.DELETE;
import static org.springframework.http.HttpMethod.PATCH;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.http.HttpMethod.PUT;
import static org.springframework.security.config.http.SessionCreationPolicy.ALWAYS;

import org.springframework.boot.autoconfigure.security.Http401AuthenticationEntryPoint;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.ForwardAuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@Configuration
@Order(ACCESS_OVERRIDE_ORDER)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(final HttpSecurity http) throws Exception {
        // @formatter:off
        http.authorizeRequests()
                .antMatchers(POST, "/api/**").authenticated()
                .antMatchers(PUT, "/api/**").authenticated()
                .antMatchers(PATCH, "/api/**").authenticated()
                .antMatchers(DELETE, "/api/**").authenticated()
                .anyRequest().permitAll()
                .and()
            .csrf()
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                .and()
            .sessionManagement()
                .sessionCreationPolicy(ALWAYS)
                .and()
            .formLogin()
                .successHandler(new ForwardAuthenticationSuccessHandler("/session"))
                .failureHandler(new SimpleUrlAuthenticationFailureHandler())
                .and()
            .logout()
                .logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler())
                .and()
            .exceptionHandling()
                .authenticationEntryPoint(new Http401AuthenticationEntryPoint("Login"));
        // @formatter:on
    }
}
