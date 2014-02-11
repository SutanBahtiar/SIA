package com.sia.open.api.wrapper;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import java.util.Map;

public final class MapJsonWrapper {

    @SuppressWarnings("unchecked")
    public static String toJsonString(Map data, Map mixin) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
        if (mixin != null) {
            objectMapper.setMixInAnnotations(mixin);
        }

        return objectMapper.writeValueAsString(data);
    }
}
