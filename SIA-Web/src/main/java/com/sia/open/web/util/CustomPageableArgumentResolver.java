package com.sia.open.web.util;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableArgumentResolver;

public class CustomPageableArgumentResolver extends PageableArgumentResolver {

    public CustomPageableArgumentResolver(int size) {
        super.setFallbackPagable(new PageRequest(0, size));
    }
}
