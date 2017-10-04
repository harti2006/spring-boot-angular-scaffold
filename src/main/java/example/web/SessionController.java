package example.web;

import static java.util.Collections.singletonMap;

import java.security.Principal;
import java.util.Collections;
import java.util.Map;
import java.util.Optional;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SessionController {

    @RequestMapping(path = "/session")
    private Map<String, String> userInfo(Principal me) {
        return Optional.ofNullable(me)
                .map(Principal::getName)
                .map(name -> singletonMap("username", me.getName()))
                .orElseGet(Collections::emptyMap);
    }
}
