package br.com.positivo.schoolar.web.rest;

import br.com.positivo.schoolar.service.TblSchoolService;
import com.codahale.metrics.annotation.Timed;
import br.com.positivo.schoolar.domain.TblSchool;
import br.com.positivo.schoolar.repository.TblSchoolRepository;
import br.com.positivo.schoolar.web.rest.errors.BadRequestAlertException;
import br.com.positivo.schoolar.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing TblSchool.
 */
@RestController
@RequestMapping("/api")
public class TblSchoolResource {

    private final Logger log = LoggerFactory.getLogger(TblSchoolResource.class);

    private static final String ENTITY_NAME = "tblSchool";

    @Autowired
    private final TblSchoolRepository tblSchoolRepository;

    @Autowired
    private TblSchoolService tblSchoolService;

    public TblSchoolResource(TblSchoolRepository tblSchoolRepository) {
        this.tblSchoolRepository = tblSchoolRepository;
    }

    /**
     * POST  /tbl-schools : Create a new tblSchool.
     *
     * @param tblSchool the tblSchool to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tblSchool, or with status 400 (Bad Request) if the tblSchool has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tbl-schools")
    @Timed
    public ResponseEntity<TblSchool> createTblSchool(@Valid @RequestBody TblSchool tblSchool) throws URISyntaxException {
        log.debug("REST request to save TblSchool : {}", tblSchool);
        if (tblSchool.getId() != null) {
            throw new BadRequestAlertException("A new tblSchool cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TblSchool result = tblSchoolRepository.save(tblSchool);
        return ResponseEntity.created(new URI("/api/tbl-schools/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tbl-schools : Updates an existing tblSchool.
     *
     * @param tblSchool the tblSchool to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tblSchool,
     * or with status 400 (Bad Request) if the tblSchool is not valid,
     * or with status 500 (Internal Server Error) if the tblSchool couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tbl-schools")
    @Timed
    public ResponseEntity<TblSchool> updateTblSchool(@Valid @RequestBody TblSchool tblSchool) throws URISyntaxException {
        log.debug("REST request to update TblSchool : {}", tblSchool);
        if (tblSchool.getId() == null) {
            return createTblSchool(tblSchool);
        }
        TblSchool result = tblSchoolRepository.save(tblSchool);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tblSchool.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tbl-schools : get all the tblSchools.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tblSchools in body
     */
    @GetMapping("/tbl-schools")
    @Timed
    public List<TblSchool> getAllTblSchools() {
        log.debug("REST request to get all TblSchools");
        return tblSchoolRepository.findAll();
        }

    /**
     * GET  /tbl-schools/:id : get the "id" tblSchool.
     *
     * @param id the id of the tblSchool to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tblSchool, or with status 404 (Not Found)
     */
    @GetMapping("/tbl-schools/{id}")
    @Timed
    public ResponseEntity<TblSchool> getTblSchool(@PathVariable Long id) {
        log.debug("REST request to get TblSchool : {}", id);
        TblSchool tblSchool = tblSchoolRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tblSchool));
    }

    /**
     * GET  /tbl-schools/:name/:limit : get the "name" and "limit" tblSchool.
     * @param name the name of the tblSchool to retrieve
     * @param limit the limit of the tblSchool to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tblSchool, or with status 404 (Not Found)
     */
    @GetMapping("/tbl-schools-name/{name}/{limit}")
    @Timed
    public List<TblSchool> getTblSchoolName(@PathVariable String name, @PathVariable Integer limit) {
        log.debug("REST request to get TblSchool : {}", name);
        log.debug("REST request to get TblSchool : {}", limit);

        Pageable topElements = new PageRequest(0, limit);
        return tblSchoolService.findAllSchoolsWhereName(name, topElements);
    }

    /**
     * DELETE  /tbl-schools/:id : delete the "id" tblSchool.
     *
     * @param id the id of the tblSchool to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tbl-schools/{id}")
    @Timed
    public ResponseEntity<Void> deleteTblSchool(@PathVariable Long id) {
        log.debug("REST request to delete TblSchool : {}", id);
        tblSchoolRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
