package br.com.positivo.schoolar.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.positivo.schoolar.domain.TblDefaultSchoolSetting;

import br.com.positivo.schoolar.repository.TblDefaultSchoolSettingRepository;
import br.com.positivo.schoolar.web.rest.errors.BadRequestAlertException;
import br.com.positivo.schoolar.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing TblDefaultSchoolSetting.
 */
@RestController
@RequestMapping("/api")
public class TblDefaultSchoolSettingResource {

    private final Logger log = LoggerFactory.getLogger(TblDefaultSchoolSettingResource.class);

    private static final String ENTITY_NAME = "tblDefaultSchoolSetting";

    private final TblDefaultSchoolSettingRepository tblDefaultSchoolSettingRepository;

    public TblDefaultSchoolSettingResource(TblDefaultSchoolSettingRepository tblDefaultSchoolSettingRepository) {
        this.tblDefaultSchoolSettingRepository = tblDefaultSchoolSettingRepository;
    }

    /**
     * POST  /tbl-default-school-settings : Create a new tblDefaultSchoolSetting.
     *
     * @param tblDefaultSchoolSetting the tblDefaultSchoolSetting to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tblDefaultSchoolSetting, or with status 400 (Bad Request) if the tblDefaultSchoolSetting has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tbl-default-school-settings")
    @Timed
    public ResponseEntity<TblDefaultSchoolSetting> createTblDefaultSchoolSetting(@RequestBody TblDefaultSchoolSetting tblDefaultSchoolSetting) throws URISyntaxException {
        log.debug("REST request to save TblDefaultSchoolSetting : {}", tblDefaultSchoolSetting);
        if (tblDefaultSchoolSetting.getId() != null) {
            throw new BadRequestAlertException("A new tblDefaultSchoolSetting cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TblDefaultSchoolSetting result = tblDefaultSchoolSettingRepository.save(tblDefaultSchoolSetting);
        return ResponseEntity.created(new URI("/api/tbl-default-school-settings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tbl-default-school-settings : Updates an existing tblDefaultSchoolSetting.
     *
     * @param tblDefaultSchoolSetting the tblDefaultSchoolSetting to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tblDefaultSchoolSetting,
     * or with status 400 (Bad Request) if the tblDefaultSchoolSetting is not valid,
     * or with status 500 (Internal Server Error) if the tblDefaultSchoolSetting couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tbl-default-school-settings")
    @Timed
    public ResponseEntity<TblDefaultSchoolSetting> updateTblDefaultSchoolSetting(@RequestBody TblDefaultSchoolSetting tblDefaultSchoolSetting) throws URISyntaxException {
        log.debug("REST request to update TblDefaultSchoolSetting : {}", tblDefaultSchoolSetting);
        if (tblDefaultSchoolSetting.getId() == null) {
            return createTblDefaultSchoolSetting(tblDefaultSchoolSetting);
        }
        TblDefaultSchoolSetting result = tblDefaultSchoolSettingRepository.save(tblDefaultSchoolSetting);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tblDefaultSchoolSetting.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tbl-default-school-settings : get all the tblDefaultSchoolSettings.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tblDefaultSchoolSettings in body
     */
    @GetMapping("/tbl-default-school-settings")
    @Timed
    public List<TblDefaultSchoolSetting> getAllTblDefaultSchoolSettings() {
        log.debug("REST request to get all TblDefaultSchoolSettings");
        return tblDefaultSchoolSettingRepository.findAll();
        }

    /**
     * GET  /tbl-default-school-settings/:id : get the "id" tblDefaultSchoolSetting.
     *
     * @param id the id of the tblDefaultSchoolSetting to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tblDefaultSchoolSetting, or with status 404 (Not Found)
     */
    @GetMapping("/tbl-default-school-settings/{id}")
    @Timed
    public ResponseEntity<TblDefaultSchoolSetting> getTblDefaultSchoolSetting(@PathVariable Long id) {
        log.debug("REST request to get TblDefaultSchoolSetting : {}", id);
        TblDefaultSchoolSetting tblDefaultSchoolSetting = tblDefaultSchoolSettingRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tblDefaultSchoolSetting));
    }

    /**
     * DELETE  /tbl-default-school-settings/:id : delete the "id" tblDefaultSchoolSetting.
     *
     * @param id the id of the tblDefaultSchoolSetting to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tbl-default-school-settings/{id}")
    @Timed
    public ResponseEntity<Void> deleteTblDefaultSchoolSetting(@PathVariable Long id) {
        log.debug("REST request to delete TblDefaultSchoolSetting : {}", id);
        tblDefaultSchoolSettingRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
