/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sia.open.api.domain.master;

import com.sia.open.api.domain.BaseCreatedChanged;
import com.sia.open.api.domain.enums.Status;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * @author sutan
 */
@Entity
@Table(name = "tm_area")
public class TmArea extends BaseCreatedChanged<Integer> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idtm_area")
    private Integer id;
    @Column(name = "area", nullable = false)
    private String area;
    @Column(name = "alamat", nullable = false)
    private String alamat;
    @Column(name = "status")
    private Status status;

    @Override
    public Integer getId() {
        return id;
    }

    @Override
    public void setId(Integer id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "TmArea{"
                + "id=" + id
                + ", area='" + area + '\''
                + ", alamat='" + alamat + '\''
                + ", status='" + status + '\''
                + '}';
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getAlamat() {
        return alamat;
    }

    public void setAlamat(String alamat) {
        this.alamat = alamat;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
