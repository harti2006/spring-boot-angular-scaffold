package com.github.harti2006.myapp.csrf;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.session.SessionAuthenticationException;
import org.springframework.security.web.authentication.session.SessionAuthenticationStrategy;

public class CsrfSessionAuthenticationStrategy implements SessionAuthenticationStrategy {

    @Override
    public void onAuthentication(final Authentication authentication, final HttpServletRequest request,
                                 final HttpServletResponse response) throws SessionAuthenticationException {
        CsrfUtil.writeCsrfCookie(request, response);
    }
}
