package br.com.positivo.schoolar.web.rest;

import br.com.positivo.schoolar.service.TblSchoolNetworkSchoolService;
import com.codahale.metrics.annotation.Timed;
import br.com.positivo.schoolar.domain.TblSchoolNetworkSchool;

import br.com.positivo.schoolar.repository.TblSchoolNetworkSchoolRepository;
import br.com.positivo.schoolar.web.rest.errors.BadRequestAlertException;
import br.com.positivo.schoolar.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing TblSchoolNetworkSchool.
 */
@RestController
@RequestMapping("/api")
public class TblSchoolNetworkSchoolResource {

    private final Logger log = LoggerFactory.getLogger(TblSchoolNetworkSchoolResource.class);

    private static final String ENTITY_NAME = "tblSchoolNetworkSchool";

    @Autowired
    private TblSchoolNetworkSchoolService serviceSchoolNetworkSchool;

    @Autowired
    private TblSchoolNetworkSchoolRepository tblSchoolNetworkSchoolRepository;

    /**
     * POST  /tbl-school-network-schools : Create a new tblSchoolNetworkSchool.
     *
     * @param tblSchoolNetworkSchool the tblSchoolNetworkSchool to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tblSchoolNetworkSchool, or with status 400 (Bad Request) if the tblSchoolNetworkSchool has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tbl-school-network-schools")
    @Timed
    public ResponseEntity<TblSchoolNetworkSchool> createTblSchoolNetworkSchool(@Valid @RequestBody TblSchoolNetworkSchool tblSchoolNetworkSchool) throws URISyntaxException {
        log.debug("REST request to save TblSchoolNetworkSchool : {}", tblSchoolNetworkSchool);
        if (tblSchoolNetworkSchool.getId() != null) {
            throw new BadRequestAlertException("A new tblSchoolNetworkSchool cannot already have an ID", ENTITY_NAME, "idexists");
        }

        TblSchoolNetworkSchool result = tblSchoolNetworkSchoolRepository.save(tblSchoolNetworkSchool);

        return ResponseEntity.created(new URI("/api/tbl-school-network-schools/" + result.getId())).headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
    }

    /**
     * PUT  /tbl-school-network-schools : Updates an existing tblSchoolNetworkSchool.
     *
     * @param tblSchoolNetworkSchool the tblSchoolNetworkSchool to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tblSchoolNetworkSchool,
     * or with status 400 (Bad Request) if the tblSchoolNetworkSchool is not valid,
     * or with status 500 (Internal Server Error) if the tblSchoolNetworkSchool couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tbl-school-network-schools")
    @Timed
    public ResponseEntity<TblSchoolNetworkSchool> updateTblSchoolNetworkSchool(@Valid @RequestBody TblSchoolNetworkSchool tblSchoolNetworkSchool) throws URISyntaxException {
        log.debug("REST request to update TblSchoolNetworkSchool : {}", tblSchoolNetworkSchool);
        if (tblSchoolNetworkSchool.getId() == null) {
            return createTblSchoolNetworkSchool(tblSchoolNetworkSchool);
        }
        TblSchoolNetworkSchool result = tblSchoolNetworkSchoolRepository.save(tblSchoolNetworkSchool);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tblSchoolNetworkSchool.getId().toString())).body(result);
    }

    /**
     * GET  /tbl-school-network-schools : get all the tblSchoolNetworkSchools.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tblSchoolNetworkSchools in body
     */
    @GetMapping("/tbl-school-network-schools")
    @Timed
    public List<TblSchoolNetworkSchool> getAllTblSchoolNetworkSchools() {
        log.debug("REST request to get all TblSchoolNetworkSchools");
        return tblSchoolNetworkSchoolRepository.findAll();
    }

    /**
     * GET  /tbl-school-network-schools/:id : get the "id" tblSchoolNetworkSchool.
     *
     * @param id the id of the tblSchoolNetworkSchool to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tblSchoolNetworkSchool, or with status 404 (Not Found)
     */
    @GetMapping("/tbl-school-network-schools/{id}")
    @Timed
    public ResponseEntity<TblSchoolNetworkSchool> getTblSchoolNetworkSchool(@PathVariable Long id) {
        log.debug("REST request to get TblSchoolNetworkSchool : {}", id);
        TblSchoolNetworkSchool tblSchoolNetworkSchool = tblSchoolNetworkSchoolRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tblSchoolNetworkSchool));
    }

    /**
     * DELETE  /tbl-school-network-schools-by-id/:schoolId : delete the "schoolId" tblSchoolNetworkSchool.
     *
     * @param schoolId the id of the tblSchoolNetworkSchool to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tbl-school-network-schools-by-id/{schoolId}")
    @Timed
    public ResponseEntity<Void> deleteTblSchoolNetworkSchoolById(@PathVariable Long schoolId) {
        log.debug("REST request to delete TblSchoolNetworkSchoolById : {}", schoolId);
        serviceSchoolNetworkSchool.deleteNetworkSchoolById(schoolId);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, schoolId.toString())).build();
    }

    /**
     * DELETE  /tbl-school-network-schools/:id : delete the "id" tblSchoolNetworkSchool.
     *
     * @param id the id of the tblSchoolNetworkSchool to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tbl-school-network-schools/{id}")
    @Timed
    public ResponseEntity<Void> deleteTblSchoolNetworkSchool(@PathVariable Long id) {
        log.debug("REST request to delete TblSchoolNetworkSchool : {}", id);
        tblSchoolNetworkSchoolRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

