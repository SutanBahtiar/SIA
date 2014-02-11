package com.sia.open.api.mixin;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"userActivity"})
public interface SecManTActivityLogMixin {
}
