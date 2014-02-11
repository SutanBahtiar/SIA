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
@Table(name = "tm_produk")
public class TmProduk extends BaseCreatedChanged<Integer> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idtm_produk")
    private Integer id;
    @Column(name = "kode", nullable = false)
    private Integer kode;
    @Column(name = "jenis", nullable = false)
    private String jenis;
    @Column(name = "produk", nullable = false)
    private String produk;
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
        return "TmProduk{"
                + "id = " + id
                + ", kode = " + kode
                + ", jenis = " + jenis
                + ", produk = " + produk
                + ", status = " + status
                + "}";
    }

    public Integer getKode() {
        return kode;
    }

    public void setKode(Integer kode) {
        this.kode = kode;
    }

    public String getJenis() {
        return jenis;
    }

    public void setJenis(String jenis) {
        this.jenis = jenis;
    }

    public String getProduk() {
        return produk;
    }

    public void setProduk(String produk) {
        this.produk = produk;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
