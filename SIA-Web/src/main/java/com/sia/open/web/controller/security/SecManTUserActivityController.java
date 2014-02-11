package com.sia.open.web.controller.security;

import com.sia.open.api.domain.security.SecManTUserActivity;
import com.sia.open.api.repository.UserActivityRepository;
import com.sia.open.api.wrapper.PageJsonWrapper;
import com.sia.open.web.controller.base.BaseRestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("/api/userActivity")
public class SecManTUserActivityController extends BaseRestController<SecManTUserActivity, Integer, UserActivityRepository> {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    public SecManTUserActivityController() {
        super(SecManTUserActivity.class);
    }
    @Autowired
    private UserActivityRepository repository;

    public UserActivityRepository getRepository() {
        return repository;
    }

    @RequestMapping("/{id}")
    @ResponseBody
    public String findById(@PathVariable Integer id, HttpServletRequest request, HttpServletResponse response) {
        boolean logsIncluded = false;
        if (request.getParameter("logIncluded") != null && request.getParameter("logIncluded").equalsIgnoreCase("true")) {
            logsIncluded = true;
        }

        SecManTUserActivity result = repository.findOne(id, logsIncluded);
        return result.toJsonString();
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    @ResponseBody
    public String findAll(Pageable pageable, HttpServletRequest request, HttpServletResponse response) {
        boolean logsIncluded = false;
        if (request.getParameter("logIncluded") != null && request.getParameter("logIncluded").equalsIgnoreCase("true")) {
            logsIncluded = true;
        }
        Page<SecManTUserActivity> result = repository.findAll(logsIncluded, pageable);
        contentRangeBuilder(result, response);

        return new PageJsonWrapper<SecManTUserActivity>(result, SecManTUserActivity.class).toJsonString();
    }
}
