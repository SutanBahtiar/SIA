package com.sia.open.api.mixin;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"active", "jabatan", "unitSatuanKerja", "password", "salt", "enabled", "accountNonExpired", "accountNonLocked", "credentialsNonExpired", "groups", "authorities"})
public interface SecManMUserMixin {
}
