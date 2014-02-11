package com.sia.open.api.repository;

import com.sia.open.api.domain.security.SecManMGroup;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GroupRepository extends PagingAndSortingRepository<SecManMGroup, Integer> {

    public List<SecManMGroup> findByNamaContaining(@Param("nama") String nama);
}
