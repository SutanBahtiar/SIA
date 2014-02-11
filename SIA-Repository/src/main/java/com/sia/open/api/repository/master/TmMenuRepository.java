/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sia.open.api.repository.master;

import com.sia.open.api.domain.master.TmMenu;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 *
 * @author sutan
 */
public interface TmMenuRepository extends PagingAndSortingRepository<TmMenu, Integer> {

    @Query("select m from TmMenu m where m.parent is null")
    Page<TmMenu> findAllMenu(Pageable pageable);
}
