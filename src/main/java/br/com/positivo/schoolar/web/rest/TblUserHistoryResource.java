package br.com.positivo.schoolar.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.positivo.schoolar.domain.TblUserHistory;

import br.com.positivo.schoolar.repository.TblUserHistoryRepository;
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
 * REST controller for managing TblUserHistory.
 */
@RestController
@RequestMapping("/api")
public class TblUserHistoryResource {

    private final Logger log = LoggerFactory.getLogger(TblUserHistoryResource.class);

    private static final String ENTITY_NAME = "tblUserHistory";

    private final TblUserHistoryRepository tblUserHistoryRepository;

    public TblUserHistoryResource(TblUserHistoryRepository tblUserHistoryRepository) {
        this.tblUserHistoryRepository = tblUserHistoryRepository;
    }

    /**
     * POST  /tbl-user-histories : Create a new tblUserHistory.
     *
     * @param tblUserHistory the tblUserHistory to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tblUserHistory, or with status 400 (Bad Request) if the tblUserHistory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tbl-user-histories")
    @Timed
    public ResponseEntity<TblUserHistory> createTblUserHistory(@Valid @RequestBody TblUserHistory tblUserHistory) throws URISyntaxException {
        log.debug("REST request to save TblUserHistory : {}", tblUserHistory);
        if (tblUserHistory.getId() != null) {
            throw new BadRequestAlertException("A new tblUserHistory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TblUserHistory result = tblUserHistoryRepository.save(tblUserHistory);
        return ResponseEntity.created(new URI("/api/tbl-user-histories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tbl-user-histories : Updates an existing tblUserHistory.
     *
     * @param tblUserHistory the tblUserHistory to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tblUserHistory,
     * or with status 400 (Bad Request) if the tblUserHistory is not valid,
     * or with status 500 (Internal Server Error) if the tblUserHistory couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tbl-user-histories")
    @Timed
    public ResponseEntity<TblUserHistory> updateTblUserHistory(@Valid @RequestBody TblUserHistory tblUserHistory) throws URISyntaxException {
        log.debug("REST request to update TblUserHistory : {}", tblUserHistory);
        if (tblUserHistory.getId() == null) {
            return createTblUserHistory(tblUserHistory);
        }
        TblUserHistory result = tblUserHistoryRepository.save(tblUserHistory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tblUserHistory.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tbl-user-histories : get all the tblUserHistories.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tblUserHistories in body
     */
    @GetMapping("/tbl-user-histories")
    @Timed
    public List<TblUserHistory> getAllTblUserHistories() {
        log.debug("REST request to get all TblUserHistories");
        return tblUserHistoryRepository.findAll();
        }

    /**
     * GET  /tbl-user-histories/:id : get the "id" tblUserHistory.
     *
     * @param id the id of the tblUserHistory to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tblUserHistory, or with status 404 (Not Found)
     */
    @GetMapping("/tbl-user-histories/{id}")
    @Timed
    public ResponseEntity<TblUserHistory> getTblUserHistory(@PathVariable Long id) {
        log.debug("REST request to get TblUserHistory : {}", id);
        TblUserHistory tblUserHistory = tblUserHistoryRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tblUserHistory));
    }

    /**
     * DELETE  /tbl-user-histories/:id : delete the "id" tblUserHistory.
     *
     * @param id the id of the tblUserHistory to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tbl-user-histories/{id}")
    @Timed
    public ResponseEntity<Void> deleteTblUserHistory(@PathVariable Long id) {
        log.debug("REST request to delete TblUserHistory : {}", id);
        tblUserHistoryRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
