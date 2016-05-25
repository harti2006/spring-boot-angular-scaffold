package com.github.harti2006.myapp.config;

import static java.util.Arrays.asList;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.security.config.http.SessionCreationPolicy.ALWAYS;

import com.github.harti2006.myapp.csrf.CsrfAwareAccessDeniedHandler;
import com.github.harti2006.myapp.csrf.CsrfCookieFilter;
import com.github.harti2006.myapp.csrf.CsrfSessionAuthenticationStrategy;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.ObjectPostProcessor;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.security.web.authentication.session.CompositeSessionAuthenticationStrategy;
import org.springframework.security.web.authentication.session.SessionAuthenticationStrategy;
import org.springframework.security.web.csrf.CsrfFilter;

@Configuration
public class SecurityConfig {

    private static final int APPLICATION_SECURITY_ORDER = SecurityProperties.ACCESS_OVERRIDE_ORDER;
    private static final int LOGIN_SECURITY_ORDER = APPLICATION_SECURITY_ORDER - 1;

    private static HttpSecurity applyGeneralOptions(HttpSecurity http) throws Exception {
        // @formatter:off
        return http
                .sessionManagement()
                    .sessionCreationPolicy(ALWAYS)
                    .withObjectPostProcessor(csrfCookieOnAuthentication()).and()
                .csrf().and()
                .exceptionHandling().accessDeniedHandler(new CsrfAwareAccessDeniedHandler()).and()
                .addFilterAfter(new CsrfCookieFilter(), CsrfFilter.class);
        // @formatter:on
    }

    private static ObjectPostProcessor<SessionAuthenticationStrategy> csrfCookieOnAuthentication() {
        return new ObjectPostProcessor<SessionAuthenticationStrategy>() {
            @SuppressWarnings("unchecked")
            @Override
            public SessionAuthenticationStrategy postProcess(final SessionAuthenticationStrategy input) {
                return new CompositeSessionAuthenticationStrategy(
                        asList(input, new CsrfSessionAuthenticationStrategy()));
            }
        };
    }

    @Configuration
    @Order(LOGIN_SECURITY_ORDER)
    static class LoginSecurityConfig extends WebSecurityConfigurerAdapter {

        @Override
        protected void configure(final HttpSecurity http) throws Exception {
            // @formatter:off
            applyGeneralOptions(
                    http.requestMatchers()
                    .antMatchers("/session").and()
                    .httpBasic().and()
                    .authorizeRequests().anyRequest().authenticated().and());
            // @formatter:on
        }
    }

    @Configuration
    @Order(APPLICATION_SECURITY_ORDER)
    static class ApplicationSecurityConfig extends WebSecurityConfigurerAdapter {

        @Override
        protected void configure(final HttpSecurity http) throws Exception {
            // @formatter:off
            applyGeneralOptions(
                    http
                    .authorizeRequests()
                    .antMatchers("/api/**").authenticated()
                    .anyRequest().permitAll().and())
                    .logout()
                        .logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler(OK));
            // @formatter:on
        }
    }
}
