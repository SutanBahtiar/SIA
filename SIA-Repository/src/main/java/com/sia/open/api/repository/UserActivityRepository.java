package com.sia.open.api.repository;

import com.sia.open.api.domain.security.SecManTUserActivity;
import com.sia.open.api.repository.custom.UserActivityRepositoryCustom;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface UserActivityRepository extends PagingAndSortingRepository<SecManTUserActivity, Integer>, UserActivityRepositoryCustom {
}
