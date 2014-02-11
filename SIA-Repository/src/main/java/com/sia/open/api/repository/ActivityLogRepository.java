package com.sia.open.api.repository;

import com.sia.open.api.domain.security.SecManTActivityLog;
import com.sia.open.api.domain.security.SecManTUserActivity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface ActivityLogRepository extends PagingAndSortingRepository<SecManTActivityLog, Integer> {

    List<SecManTActivityLog> findByUserActivity(SecManTUserActivity userActivity);

    Page<SecManTActivityLog> findByUserActivity(SecManTUserActivity userActivity, Pageable pageable);
}
