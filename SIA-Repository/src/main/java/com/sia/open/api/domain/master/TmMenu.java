/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sia.open.api.domain.master;

import com.sia.open.api.domain.BaseCreatedChanged;
import com.sia.open.api.mixin.TmMenuMixin;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 *
 * @author sutan
 */
@Entity
@Table(name = "tm_menu")
public class TmMenu extends BaseCreatedChanged<Integer> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "idtm_menu")
    private Integer id;
    @Column(name = "text")
    private String text;
    @Column(name = "expanded")
    private Boolean expanded;
    @Column(name = "leaf")
    private Boolean leaf;
    @Column(name = "form")
    private String hrefTarget;
    @Column(name = "icon_css")
    private String iconCls;
    @Column(name = "urutan")
    private Integer order;
    @ManyToOne
    @JoinColumn(name = "parent_id", nullable = true)
    private TmMenu parent;
    @OneToMany(orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "parent_id")
    private List<TmMenu> children = new ArrayList<TmMenu>();

    public TmMenu() {
    }

    public TmMenu(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Boolean getExpanded() {
        return expanded;
    }

    public void setExpanded(Boolean expanded) {
        this.expanded = expanded;
    }

    public Boolean getLeaf() {
        return leaf;
    }

    public void setLeaf(Boolean leaf) {
        this.leaf = leaf;
    }

    public String getHrefTarget() {
        return hrefTarget;
    }

    public void setHrefTarget(String hrefTarget) {
        this.hrefTarget = hrefTarget;
    }

    public String getIconCls() {
        return iconCls;
    }

    public void setIconCls(String iconCls) {
        this.iconCls = iconCls;
    }

    public Integer getOrder() {
        return order;
    }

    public void setOrder(Integer order) {
        this.order = order;
    }

    @Override
    public String toString() {
        return toJsonString();
    }

    public TmMenu getParent() {
        return parent;
    }

    public void setParent(TmMenu parent) {
        this.parent = parent;
    }

    public List<TmMenu> getChildren() {
        return children;
    }

    public void setChildren(List<TmMenu> children) {
        this.children = children;
    }

    @Override
    public Map<Class<?>, Class<?>> getDefaultMixin() {
        Map<Class<?>, Class<?>> result = new HashMap<Class<?>, Class<?>>();

        result.put(TmMenu.class, TmMenuMixin.class);

        return result;
    }
}
