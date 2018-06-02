package br.com.positivo.schoolar.repository;

import br.com.positivo.schoolar.domain.TblSchoolSetting;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TblSchoolSetting entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TblSchoolSettingRepository extends JpaRepository<TblSchoolSetting, Long> {

}
