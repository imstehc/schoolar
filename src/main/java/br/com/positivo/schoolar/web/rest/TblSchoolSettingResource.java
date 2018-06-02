package br.com.positivo.schoolar.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.positivo.schoolar.domain.TblSchoolSetting;

import br.com.positivo.schoolar.repository.TblSchoolSettingRepository;
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
 * REST controller for managing TblSchoolSetting.
 */
@RestController
@RequestMapping("/api")
public class TblSchoolSettingResource {

    private final Logger log = LoggerFactory.getLogger(TblSchoolSettingResource.class);

    private static final String ENTITY_NAME = "tblSchoolSetting";

    private final TblSchoolSettingRepository tblSchoolSettingRepository;

    public TblSchoolSettingResource(TblSchoolSettingRepository tblSchoolSettingRepository) {
        this.tblSchoolSettingRepository = tblSchoolSettingRepository;
    }

    /**
     * POST  /tbl-school-settings : Create a new tblSchoolSetting.
     *
     * @param tblSchoolSetting the tblSchoolSetting to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tblSchoolSetting, or with status 400 (Bad Request) if the tblSchoolSetting has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tbl-school-settings")
    @Timed
    public ResponseEntity<TblSchoolSetting> createTblSchoolSetting(@RequestBody TblSchoolSetting tblSchoolSetting) throws URISyntaxException {
        log.debug("REST request to save TblSchoolSetting : {}", tblSchoolSetting);
        if (tblSchoolSetting.getId() != null) {
            throw new BadRequestAlertException("A new tblSchoolSetting cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TblSchoolSetting result = tblSchoolSettingRepository.save(tblSchoolSetting);
        return ResponseEntity.created(new URI("/api/tbl-school-settings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tbl-school-settings : Updates an existing tblSchoolSetting.
     *
     * @param tblSchoolSetting the tblSchoolSetting to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tblSchoolSetting,
     * or with status 400 (Bad Request) if the tblSchoolSetting is not valid,
     * or with status 500 (Internal Server Error) if the tblSchoolSetting couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tbl-school-settings")
    @Timed
    public ResponseEntity<TblSchoolSetting> updateTblSchoolSetting(@RequestBody TblSchoolSetting tblSchoolSetting) throws URISyntaxException {
        log.debug("REST request to update TblSchoolSetting : {}", tblSchoolSetting);
        if (tblSchoolSetting.getId() == null) {
            return createTblSchoolSetting(tblSchoolSetting);
        }
        TblSchoolSetting result = tblSchoolSettingRepository.save(tblSchoolSetting);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tblSchoolSetting.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tbl-school-settings : get all the tblSchoolSettings.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tblSchoolSettings in body
     */
    @GetMapping("/tbl-school-settings")
    @Timed
    public List<TblSchoolSetting> getAllTblSchoolSettings() {
        log.debug("REST request to get all TblSchoolSettings");
        return tblSchoolSettingRepository.findAll();
        }

    /**
     * GET  /tbl-school-settings/:id : get the "id" tblSchoolSetting.
     *
     * @param id the id of the tblSchoolSetting to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tblSchoolSetting, or with status 404 (Not Found)
     */
    @GetMapping("/tbl-school-settings/{id}")
    @Timed
    public ResponseEntity<TblSchoolSetting> getTblSchoolSetting(@PathVariable Long id) {
        log.debug("REST request to get TblSchoolSetting : {}", id);
        TblSchoolSetting tblSchoolSetting = tblSchoolSettingRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tblSchoolSetting));
    }

    /**
     * DELETE  /tbl-school-settings/:id : delete the "id" tblSchoolSetting.
     *
     * @param id the id of the tblSchoolSetting to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tbl-school-settings/{id}")
    @Timed
    public ResponseEntity<Void> deleteTblSchoolSetting(@PathVariable Long id) {
        log.debug("REST request to delete TblSchoolSetting : {}", id);
        tblSchoolSettingRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
