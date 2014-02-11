package com.sia.open.web.controller.base;

import com.sia.open.api.domain.security.SecManTActivityLog;
import com.sia.open.api.domain.security.SecManTUserActivity;
import com.sia.open.api.repository.ActivityLogRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;

public abstract class BaseLogHelper {

    @Autowired
    protected ActivityLogRepository activityLogRepository;

    protected void addLogForAction(HttpServletRequest request, String action) {
        if (request.getSession().getAttribute("userActivity") instanceof SecManTUserActivity) {
            SecManTUserActivity userActivity = (SecManTUserActivity) request.getSession().getAttribute("userActivity");

            SecManTActivityLog activityLog = new SecManTActivityLog();
            activityLog.setUserActivity(userActivity);
            activityLog.setUserAction(action);

            activityLogRepository.save(activityLog);
        }
    }
}
