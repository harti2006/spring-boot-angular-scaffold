package com.github.harti2006.myapp.csrf;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandlerImpl;
import org.springframework.security.web.csrf.CsrfException;

public class CsrfAwareAccessDeniedHandler extends AccessDeniedHandlerImpl {

    @Override
    public void handle(final HttpServletRequest request, final HttpServletResponse response,
                       final AccessDeniedException accessDeniedException)
            throws IOException, ServletException {
        if (accessDeniedException instanceof CsrfException) {
            CsrfUtil.writeCsrfCookie(request, response);
        }

        super.handle(request, response, accessDeniedException);
    }
}
