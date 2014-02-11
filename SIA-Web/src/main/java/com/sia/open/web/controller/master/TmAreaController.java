/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sia.open.web.controller.master;

import com.sia.open.api.domain.master.TmArea;
import com.sia.open.api.repository.master.TmAreaRepository;
import com.sia.open.web.controller.base.BaseRestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author sutan
 */
@Controller
@RequestMapping(value = "/api/area")
public class TmAreaController extends BaseRestController<TmArea, Integer, TmAreaRepository> {

    @Autowired
    private TmAreaRepository repository;

    protected TmAreaController() {
        super(TmArea.class);
    }

    @Override
    public TmAreaRepository getRepository() {
        return repository;
    }
}
