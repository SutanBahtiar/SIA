package com.sia.open.api.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.persistence.MappedSuperclass;
import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

@MappedSuperclass
public abstract class Base<T extends Serializable> implements Serializable {

    private static final long serialVersionUID = -3433899042356843128L;

    protected Base() {
    }

    protected Base(T id) {
        setId(id);
    }

    public abstract T getId();

    public abstract void setId(T id);

    public abstract String toString();

    public void updateAttributes(Base<T> o) {
        if (o.getId() != null) {
            this.setId(o.getId());
        }
    }

    @JsonIgnore
    public Map<Class<?>, Class<?>> getDefaultMixin() {
        return new HashMap<Class<?>, Class<?>>();
    }

    public String toJsonString() {
        ObjectMapper objectMapper = new ObjectMapper();
        if (getDefaultMixin() != null) {
            objectMapper.setMixInAnnotations(getDefaultMixin());
        }

        try {
            return objectMapper.writeValueAsString(this);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "Exception " + e.getMessage();
        }
    }
}
