/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sia.open.web.controller.master;

import com.sia.open.api.domain.master.TmProduk;
import com.sia.open.api.repository.master.TmProdukRepository;
import com.sia.open.web.controller.base.BaseRestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author sutan
 */
@Controller
@RequestMapping(value = "/api/produk")
public class TmProdukController extends BaseRestController<TmProduk, Integer, TmProdukRepository> {

    @Autowired
    private TmProdukRepository repository;

    protected TmProdukController() {
        super(TmProduk.class);
    }

    @Override
    public TmProdukRepository getRepository() {
        return repository;
    }
}
