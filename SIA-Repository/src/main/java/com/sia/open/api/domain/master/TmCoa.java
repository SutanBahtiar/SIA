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
@Table(name = "tm_coa")
public class TmCoa extends BaseCreatedChanged<Integer> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idtm_coa")
    private Integer id;
    @Column(name = "kode", nullable = false)
    private Integer kode;
    @Column(name = "rekening", nullable = false)
    private String rekening;
    @Column(name = "flag", nullable = false)
    private String flags;
    @Column(name = "status", nullable = false)
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
        return "TmCoa{id=" + id
                + ", kode = " + kode
                + ", rekening = " + rekening
                + ", flags = " + flags
                + ", status = " + status
                + "}";
    }

    public Integer getKode() {
        return kode;
    }

    public void setKode(Integer kode) {
        this.kode = kode;
    }

    public String getRekening() {
        return rekening;
    }

    public void setRekening(String rekening) {
        this.rekening = rekening;
    }

    public String getFlags() {
        return flags;
    }

    public void setFlags(String flags) {
        this.flags = flags;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
