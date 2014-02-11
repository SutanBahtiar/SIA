package com.sia.open.web.listener;

import com.sia.open.api.domain.security.SecManMUser;
import com.sia.open.api.domain.security.SecManTUserActivity;
import com.sia.open.api.repository.UserActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

@Component("customAuthenticationSuccessHandler")
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Autowired
    private UserActivityRepository userActivityRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication) throws IOException, ServletException {

        if (authentication.getPrincipal() instanceof SecManMUser) {
            SecManTUserActivity userActivity = new SecManTUserActivity();
            userActivity.setUser((SecManMUser) authentication.getPrincipal());
            userActivity.setLoginTime(new Date());

            userActivityRepository.save(userActivity);
            httpServletRequest.getSession().setAttribute("userActivity", userActivity);
        }


        httpServletResponse.sendRedirect(httpServletRequest.getContextPath() + "/");
    }
}
