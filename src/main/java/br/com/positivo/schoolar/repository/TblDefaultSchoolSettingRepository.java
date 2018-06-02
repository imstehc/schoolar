package br.com.positivo.schoolar.repository;

import br.com.positivo.schoolar.domain.TblDefaultSchoolSetting;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TblDefaultSchoolSetting entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TblDefaultSchoolSettingRepository extends JpaRepository<TblDefaultSchoolSetting, Long> {

}
