/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sia.open.web.controller.master;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.sia.open.api.domain.master.TmMenu;
import com.sia.open.api.repository.master.TmMenuRepository;
import com.sia.open.api.wrapper.ListJsonWrapper;
import com.sia.open.web.controller.base.BaseRestController;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author sutan
 */
@Controller
@RequestMapping(value = "/api/menu")
public class TmMenuController extends BaseRestController<TmMenu, Integer, TmMenuRepository> {

    @Autowired
    private TmMenuRepository repository;

    protected TmMenuController() {
        super(TmMenu.class);
    }

    @Override
    public TmMenuRepository getRepository() {
        return repository;
    }

    @RequestMapping(value = "/treeMenu/", method = RequestMethod.GET)
    @ResponseBody
    public String findAllMenu(Pageable pageable, HttpServletRequest request, HttpServletResponse response) throws JsonProcessingException {
        List<TmMenu> result = getRepository().findAllMenu(pageable).getContent();
        return "{ \"text\" : \".\" , \"children\" : " + new ListJsonWrapper(result, TmMenu.class).toJsonString() + " }";
    }
}
