package com.sia.open.web.controller.security;

import com.sia.open.api.domain.security.SecManMGroup;
import com.sia.open.api.repository.GroupRepository;
import com.sia.open.web.controller.base.BaseRestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/group")
public class SecManMGroupController extends BaseRestController<SecManMGroup, Integer, GroupRepository> {

    private Logger logger = LoggerFactory.getLogger(this.getClass());
    @Autowired
    private GroupRepository repository;

    protected SecManMGroupController() {
        super(SecManMGroup.class);
    }

    public GroupRepository getRepository() {
        return repository;
    }
}
