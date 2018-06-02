package br.com.positivo.schoolar.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.positivo.schoolar.domain.TblGuardianHistory;

import br.com.positivo.schoolar.repository.TblGuardianHistoryRepository;
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
 * REST controller for managing TblGuardianHistory.
 */
@RestController
@RequestMapping("/api")
public class TblGuardianHistoryResource {

    private final Logger log = LoggerFactory.getLogger(TblGuardianHistoryResource.class);

    private static final String ENTITY_NAME = "tblGuardianHistory";

    private final TblGuardianHistoryRepository tblGuardianHistoryRepository;

    public TblGuardianHistoryResource(TblGuardianHistoryRepository tblGuardianHistoryRepository) {
        this.tblGuardianHistoryRepository = tblGuardianHistoryRepository;
    }

    /**
     * POST  /tbl-guardian-histories : Create a new tblGuardianHistory.
     *
     * @param tblGuardianHistory the tblGuardianHistory to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tblGuardianHistory, or with status 400 (Bad Request) if the tblGuardianHistory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tbl-guardian-histories")
    @Timed
    public ResponseEntity<TblGuardianHistory> createTblGuardianHistory(@Valid @RequestBody TblGuardianHistory tblGuardianHistory) throws URISyntaxException {
        log.debug("REST request to save TblGuardianHistory : {}", tblGuardianHistory);
        if (tblGuardianHistory.getId() != null) {
            throw new BadRequestAlertException("A new tblGuardianHistory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TblGuardianHistory result = tblGuardianHistoryRepository.save(tblGuardianHistory);
        return ResponseEntity.created(new URI("/api/tbl-guardian-histories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tbl-guardian-histories : Updates an existing tblGuardianHistory.
     *
     * @param tblGuardianHistory the tblGuardianHistory to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tblGuardianHistory,
     * or with status 400 (Bad Request) if the tblGuardianHistory is not valid,
     * or with status 500 (Internal Server Error) if the tblGuardianHistory couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tbl-guardian-histories")
    @Timed
    public ResponseEntity<TblGuardianHistory> updateTblGuardianHistory(@Valid @RequestBody TblGuardianHistory tblGuardianHistory) throws URISyntaxException {
        log.debug("REST request to update TblGuardianHistory : {}", tblGuardianHistory);
        if (tblGuardianHistory.getId() == null) {
            return createTblGuardianHistory(tblGuardianHistory);
        }
        TblGuardianHistory result = tblGuardianHistoryRepository.save(tblGuardianHistory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tblGuardianHistory.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tbl-guardian-histories : get all the tblGuardianHistories.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tblGuardianHistories in body
     */
    @GetMapping("/tbl-guardian-histories")
    @Timed
    public List<TblGuardianHistory> getAllTblGuardianHistories() {
        log.debug("REST request to get all TblGuardianHistories");
        return tblGuardianHistoryRepository.findAll();
        }

    /**
     * GET  /tbl-guardian-histories/:id : get the "id" tblGuardianHistory.
     *
     * @param id the id of the tblGuardianHistory to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tblGuardianHistory, or with status 404 (Not Found)
     */
    @GetMapping("/tbl-guardian-histories/{id}")
    @Timed
    public ResponseEntity<TblGuardianHistory> getTblGuardianHistory(@PathVariable Long id) {
        log.debug("REST request to get TblGuardianHistory : {}", id);
        TblGuardianHistory tblGuardianHistory = tblGuardianHistoryRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tblGuardianHistory));
    }

    /**
     * DELETE  /tbl-guardian-histories/:id : delete the "id" tblGuardianHistory.
     *
     * @param id the id of the tblGuardianHistory to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tbl-guardian-histories/{id}")
    @Timed
    public ResponseEntity<Void> deleteTblGuardianHistory(@PathVariable Long id) {
        log.debug("REST request to delete TblGuardianHistory : {}", id);
        tblGuardianHistoryRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
