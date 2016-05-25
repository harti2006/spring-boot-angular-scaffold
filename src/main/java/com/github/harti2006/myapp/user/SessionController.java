package com.github.harti2006.myapp.user;

import static java.util.Collections.singletonMap;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

import java.security.Principal;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/session")
public class SessionController {

    @RequestMapping(method = {GET, POST})
    private Map<String, Object> userInfo(Principal me) {
        return singletonMap("name", me.getName());
    }
}
