package br.com.positivo.schoolar.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.positivo.schoolar.domain.TblSchoolHistory;

import br.com.positivo.schoolar.repository.TblSchoolHistoryRepository;
import br.com.positivo.schoolar.web.rest.errors.BadRequestAlertException;
import br.com.positivo.schoolar.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing TblSchoolHistory.
 */
@RestController
@RequestMapping("/api")
public class TblSchoolHistoryResource {

    private final Logger log = LoggerFactory.getLogger(TblSchoolHistoryResource.class);

    private static final String ENTITY_NAME = "tblSchoolHistory";

    private final TblSchoolHistoryRepository tblSchoolHistoryRepository;

    public TblSchoolHistoryResource(TblSchoolHistoryRepository tblSchoolHistoryRepository) {
        this.tblSchoolHistoryRepository = tblSchoolHistoryRepository;
    }

    /**
     * POST  /tbl-school-histories : Create a new tblSchoolHistory.
     *
     * @param tblSchoolHistory the tblSchoolHistory to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tblSchoolHistory, or with status 400 (Bad Request) if the tblSchoolHistory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tbl-school-histories")
    @Timed
    public ResponseEntity<TblSchoolHistory> createTblSchoolHistory(@Valid @RequestBody TblSchoolHistory tblSchoolHistory) throws URISyntaxException {
        log.debug("REST request to save TblSchoolHistory : {}", tblSchoolHistory);
        if (tblSchoolHistory.getId() != null) {
            throw new BadRequestAlertException("A new tblSchoolHistory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TblSchoolHistory result = tblSchoolHistoryRepository.save(tblSchoolHistory);
        return ResponseEntity.created(new URI("/api/tbl-school-histories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tbl-school-histories : Updates an existing tblSchoolHistory.
     *
     * @param tblSchoolHistory the tblSchoolHistory to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tblSchoolHistory,
     * or with status 400 (Bad Request) if the tblSchoolHistory is not valid,
     * or with status 500 (Internal Server Error) if the tblSchoolHistory couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tbl-school-histories")
    @Timed
    public ResponseEntity<TblSchoolHistory> updateTblSchoolHistory(@Valid @RequestBody TblSchoolHistory tblSchoolHistory) throws URISyntaxException {
        log.debug("REST request to update TblSchoolHistory : {}", tblSchoolHistory);
        if (tblSchoolHistory.getId() == null) {
            return createTblSchoolHistory(tblSchoolHistory);
        }
        TblSchoolHistory result = tblSchoolHistoryRepository.save(tblSchoolHistory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tblSchoolHistory.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tbl-school-histories : get all the tblSchoolHistories.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tblSchoolHistories in body
     */
    @GetMapping("/tbl-school-histories")
    @Timed
    public List<TblSchoolHistory> getAllTblSchoolHistories() {
        log.debug("REST request to get all TblSchoolHistories");
        return tblSchoolHistoryRepository.findAll();
        }

    /**
     * GET  /tbl-school-histories/:id : get the "id" tblSchoolHistory.
     *
     * @param id the id of the tblSchoolHistory to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tblSchoolHistory, or with status 404 (Not Found)
     */
    @GetMapping("/tbl-school-histories/{id}")
    @Timed
    public ResponseEntity<TblSchoolHistory> getTblSchoolHistory(@PathVariable Long id) {
        log.debug("REST request to get TblSchoolHistory : {}", id);
        TblSchoolHistory tblSchoolHistory = tblSchoolHistoryRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tblSchoolHistory));
    }

    /**
     * DELETE  /tbl-school-histories/:id : delete the "id" tblSchoolHistory.
     *
     * @param id the id of the tblSchoolHistory to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tbl-school-histories/{id}")
    @Timed
    public ResponseEntity<Void> deleteTblSchoolHistory(@PathVariable Long id) {
        log.debug("REST request to delete TblSchoolHistory : {}", id);
        tblSchoolHistoryRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
