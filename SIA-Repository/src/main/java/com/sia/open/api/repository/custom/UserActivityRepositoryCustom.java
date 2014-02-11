package com.sia.open.api.repository.custom;

import com.sia.open.api.domain.security.SecManTUserActivity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserActivityRepositoryCustom {

    SecManTUserActivity findOne(Integer id, boolean childIncluded);

    List<SecManTUserActivity> findAll(boolean childIncluded);

    Page<SecManTUserActivity> findAll(boolean childIncluded, Pageable pageable);
}
