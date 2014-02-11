package com.sia.open.api.domain;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.sia.open.api.json.JsonDateDeserializer;
import com.sia.open.api.json.JsonDateSerializer;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@MappedSuperclass
public abstract class BaseCreatedChanged<T extends Serializable> extends Base<T> {

    protected BaseCreatedChanged() {
    }

    protected BaseCreatedChanged(T id) {
        super(id);
    }
    @Column(name = "created_by", length = 45, updatable = false)
    private String createdBy;
    @Column(name = "changed_by", length = 45)
    private String changedBy;
    @Column(name = "entity", length = 45)
    private String entity;
    @Column(name = "created_at", updatable = false)
    @Temporal(value = TemporalType.TIMESTAMP)
    @JsonSerialize(using = JsonDateSerializer.class)
    @JsonDeserialize(using = JsonDateDeserializer.class)
    private Date createdAt;
    @Column(name = "changed_at")
    @Temporal(value = TemporalType.TIMESTAMP)
    @JsonSerialize(using = JsonDateSerializer.class)
    @JsonDeserialize(using = JsonDateDeserializer.class)
    private Date changedAt;

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getEntity() {
        return entity;
    }

    public void setEntity(String entity) {
        this.entity = entity;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public String getChangedBy() {
        return changedBy;
    }

    public void setChangedBy(String changedBy) {
        this.changedBy = changedBy;
    }

    public Date getChangedAt() {
        return changedAt;
    }

    public void setChangedAt(Date changedAt) {
        this.changedAt = changedAt;
    }

    @PrePersist
    public void populateCreated() {
        this.setCreatedAt(new Date());
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            this.setCreatedBy(authentication.getName());
        }
    }

    @PreUpdate
    public void populateChanged() {
        this.setChangedAt(new Date());
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            this.setChangedBy(authentication.getName());
        }
    }

    public void updateAttributes(BaseCreatedChanged<T> o) {
        super.updateAttributes(o);
        this.setCreatedAt(o.getCreatedAt());
        this.setCreatedBy(o.getCreatedBy());
    }
}
