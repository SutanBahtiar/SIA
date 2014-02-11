package com.sia.open.web.controller.security;

import com.sia.open.api.domain.security.SecManMRole;
import com.sia.open.api.repository.RoleRepository;
import com.sia.open.web.controller.base.BaseRestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;



@Controller
@RequestMapping("/api/role")
public class SecManMRoleController extends BaseRestController<SecManMRole, String, RoleRepository> {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private RoleRepository repository;

    protected SecManMRoleController() {
        super(SecManMRole.class);
    }

    public RoleRepository getRepository() {
        return repository;
    }

}
