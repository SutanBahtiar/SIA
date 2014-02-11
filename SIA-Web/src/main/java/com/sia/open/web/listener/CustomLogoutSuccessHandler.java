package com.sia.open.web.listener;

import com.sia.open.api.domain.security.SecManTUserActivity;
import com.sia.open.api.repository.UserActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

@Component("customLogoutSuccessHandler")
public class CustomLogoutSuccessHandler implements LogoutSuccessHandler {

    @Autowired
    private UserActivityRepository userActivityRepository;

    @Override
    public void onLogoutSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication) throws IOException, ServletException {

        if (httpServletRequest.getSession().getAttribute("userActivity") instanceof SecManTUserActivity) {
            SecManTUserActivity userActivity = (SecManTUserActivity) httpServletRequest.getSession().getAttribute("userActivity");


            if (userActivityRepository.exists(userActivity.getId())) {
                userActivity = userActivityRepository.findOne(userActivity.getId());
                userActivity.setLogoutTime(new Date());
                userActivityRepository.save(userActivity);
            }


        }


        httpServletRequest.getSession().invalidate();
        httpServletResponse.sendRedirect(httpServletRequest.getContextPath() + "/loginpage");
    }
}
