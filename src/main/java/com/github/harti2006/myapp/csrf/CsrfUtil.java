package com.github.harti2006.myapp.csrf;

import static org.springframework.web.util.WebUtils.getCookie;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.web.csrf.CsrfToken;

final class CsrfUtil {

    private CsrfUtil() {
    }

    static void writeCsrfCookie(final HttpServletRequest request, final HttpServletResponse response) {
        final CsrfToken csrf = (CsrfToken) request.getAttribute(CsrfToken.class.getName());
        if (csrf != null) {
            Cookie cookie = getCookie(request, "CSRF-TOKEN");
            String token = csrf.getToken();
            if (cookie == null || token != null && !token.equals(cookie.getValue())) {
                cookie = new Cookie("CSRF-TOKEN", token);
                cookie.setPath("/");
                response.addCookie(cookie);
            }
        }
    }
}
