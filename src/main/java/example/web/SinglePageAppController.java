package example.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SinglePageAppController {

  @RequestMapping({"/", "/index.htm", "/index.html", "/app"})
  public String redirectIndex() {
    return "redirect:/app/index.html";
  }

  @RequestMapping("/app/{path:[^\\.]+}/**")
  public String forwardToSinglePageApp() {
    return "forward:/app/index.html";
  }
}
