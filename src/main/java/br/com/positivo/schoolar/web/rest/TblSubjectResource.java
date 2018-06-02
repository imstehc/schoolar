package br.com.positivo.schoolar.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.positivo.schoolar.domain.TblSubject;

import br.com.positivo.schoolar.repository.TblSubjectRepository;
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
 * REST controller for managing TblSubject.
 */
@RestController
@RequestMapping("/api")
public class TblSubjectResource {

    private final Logger log = LoggerFactory.getLogger(TblSubjectResource.class);

    private static final String ENTITY_NAME = "tblSubject";

    private final TblSubjectRepository tblSubjectRepository;

    public TblSubjectResource(TblSubjectRepository tblSubjectRepository) {
        this.tblSubjectRepository = tblSubjectRepository;
    }

    /**
     * POST  /tbl-subjects : Create a new tblSubject.
     *
     * @param tblSubject the tblSubject to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tblSubject, or with status 400 (Bad Request) if the tblSubject has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tbl-subjects")
    @Timed
    public ResponseEntity<TblSubject> createTblSubject(@RequestBody TblSubject tblSubject) throws URISyntaxException {
        log.debug("REST request to save TblSubject : {}", tblSubject);
        if (tblSubject.getId() != null) {
            throw new BadRequestAlertException("A new tblSubject cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TblSubject result = tblSubjectRepository.save(tblSubject);
        return ResponseEntity.created(new URI("/api/tbl-subjects/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tbl-subjects : Updates an existing tblSubject.
     *
     * @param tblSubject the tblSubject to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tblSubject,
     * or with status 400 (Bad Request) if the tblSubject is not valid,
     * or with status 500 (Internal Server Error) if the tblSubject couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tbl-subjects")
    @Timed
    public ResponseEntity<TblSubject> updateTblSubject(@RequestBody TblSubject tblSubject) throws URISyntaxException {
        log.debug("REST request to update TblSubject : {}", tblSubject);
        if (tblSubject.getId() == null) {
            return createTblSubject(tblSubject);
        }
        TblSubject result = tblSubjectRepository.save(tblSubject);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tblSubject.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tbl-subjects : get all the tblSubjects.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tblSubjects in body
     */
    @GetMapping("/tbl-subjects")
    @Timed
    public List<TblSubject> getAllTblSubjects() {
        log.debug("REST request to get all TblSubjects");
        return tblSubjectRepository.findAll();
        }

    /**
     * GET  /tbl-subjects/:id : get the "id" tblSubject.
     *
     * @param id the id of the tblSubject to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tblSubject, or with status 404 (Not Found)
     */
    @GetMapping("/tbl-subjects/{id}")
    @Timed
    public ResponseEntity<TblSubject> getTblSubject(@PathVariable Long id) {
        log.debug("REST request to get TblSubject : {}", id);
        TblSubject tblSubject = tblSubjectRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tblSubject));
    }

    /**
     * DELETE  /tbl-subjects/:id : delete the "id" tblSubject.
     *
     * @param id the id of the tblSubject to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tbl-subjects/{id}")
    @Timed
    public ResponseEntity<Void> deleteTblSubject(@PathVariable Long id) {
        log.debug("REST request to delete TblSubject : {}", id);
        tblSubjectRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
