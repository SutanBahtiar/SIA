/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sia.open.web.controller.master;

import com.sia.open.api.domain.master.TmCoa;
import com.sia.open.api.repository.master.TmCoaRepository;
import com.sia.open.web.controller.base.BaseRestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author sutan
 */
@Controller
@RequestMapping(value = "/api/coa")
public class TmCoaController extends BaseRestController<TmCoa, Integer, TmCoaRepository> {

    @Autowired
    private TmCoaRepository repository;

    protected TmCoaController() {
        super(TmCoa.class);
    }

    @Override
    public TmCoaRepository getRepository() {
        return repository;
    }
}
