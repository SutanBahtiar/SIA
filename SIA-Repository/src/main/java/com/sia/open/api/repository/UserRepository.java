package com.sia.open.api.repository;

import com.sia.open.api.domain.security.SecManMUser;
import com.sia.open.api.repository.custom.UserRepositoryCustom;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface UserRepository extends PagingAndSortingRepository<SecManMUser, String>, UserRepositoryCustom {

    SecManMUser findByUsername(String username);
}
