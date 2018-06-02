package br.com.positivo.schoolar.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.positivo.schoolar.domain.TblSchoolSubject;

import br.com.positivo.schoolar.repository.TblSchoolSubjectRepository;
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
 * REST controller for managing TblSchoolSubject.
 */
@RestController
@RequestMapping("/api")
public class TblSchoolSubjectResource {

    private final Logger log = LoggerFactory.getLogger(TblSchoolSubjectResource.class);

    private static final String ENTITY_NAME = "tblSchoolSubject";

    private final TblSchoolSubjectRepository tblSchoolSubjectRepository;

    public TblSchoolSubjectResource(TblSchoolSubjectRepository tblSchoolSubjectRepository) {
        this.tblSchoolSubjectRepository = tblSchoolSubjectRepository;
    }

    /**
     * POST  /tbl-school-subjects : Create a new tblSchoolSubject.
     *
     * @param tblSchoolSubject the tblSchoolSubject to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tblSchoolSubject, or with status 400 (Bad Request) if the tblSchoolSubject has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tbl-school-subjects")
    @Timed
    public ResponseEntity<TblSchoolSubject> createTblSchoolSubject(@RequestBody TblSchoolSubject tblSchoolSubject) throws URISyntaxException {
        log.debug("REST request to save TblSchoolSubject : {}", tblSchoolSubject);
        if (tblSchoolSubject.getId() != null) {
            throw new BadRequestAlertException("A new tblSchoolSubject cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TblSchoolSubject result = tblSchoolSubjectRepository.save(tblSchoolSubject);
        return ResponseEntity.created(new URI("/api/tbl-school-subjects/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tbl-school-subjects : Updates an existing tblSchoolSubject.
     *
     * @param tblSchoolSubject the tblSchoolSubject to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tblSchoolSubject,
     * or with status 400 (Bad Request) if the tblSchoolSubject is not valid,
     * or with status 500 (Internal Server Error) if the tblSchoolSubject couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tbl-school-subjects")
    @Timed
    public ResponseEntity<TblSchoolSubject> updateTblSchoolSubject(@RequestBody TblSchoolSubject tblSchoolSubject) throws URISyntaxException {
        log.debug("REST request to update TblSchoolSubject : {}", tblSchoolSubject);
        if (tblSchoolSubject.getId() == null) {
            return createTblSchoolSubject(tblSchoolSubject);
        }
        TblSchoolSubject result = tblSchoolSubjectRepository.save(tblSchoolSubject);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tblSchoolSubject.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tbl-school-subjects : get all the tblSchoolSubjects.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tblSchoolSubjects in body
     */
    @GetMapping("/tbl-school-subjects")
    @Timed
    public List<TblSchoolSubject> getAllTblSchoolSubjects() {
        log.debug("REST request to get all TblSchoolSubjects");
        return tblSchoolSubjectRepository.findAll();
        }

    /**
     * GET  /tbl-school-subjects/:id : get the "id" tblSchoolSubject.
     *
     * @param id the id of the tblSchoolSubject to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tblSchoolSubject, or with status 404 (Not Found)
     */
    @GetMapping("/tbl-school-subjects/{id}")
    @Timed
    public ResponseEntity<TblSchoolSubject> getTblSchoolSubject(@PathVariable Long id) {
        log.debug("REST request to get TblSchoolSubject : {}", id);
        TblSchoolSubject tblSchoolSubject = tblSchoolSubjectRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tblSchoolSubject));
    }

    /**
     * DELETE  /tbl-school-subjects/:id : delete the "id" tblSchoolSubject.
     *
     * @param id the id of the tblSchoolSubject to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tbl-school-subjects/{id}")
    @Timed
    public ResponseEntity<Void> deleteTblSchoolSubject(@PathVariable Long id) {
        log.debug("REST request to delete TblSchoolSubject : {}", id);
        tblSchoolSubjectRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
