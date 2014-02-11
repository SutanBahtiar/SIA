package com.sia.open.api.repository;

import com.sia.open.api.domain.security.SecManMRole;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface RoleRepository extends PagingAndSortingRepository<SecManMRole, String> {
}
