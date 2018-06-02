package br.com.positivo.schoolar.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.positivo.schoolar.domain.TblGrade;

import br.com.positivo.schoolar.repository.TblGradeRepository;
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
 * REST controller for managing TblGrade.
 */
@RestController
@RequestMapping("/api")
public class TblGradeResource {

    private final Logger log = LoggerFactory.getLogger(TblGradeResource.class);

    private static final String ENTITY_NAME = "tblGrade";

    private final TblGradeRepository tblGradeRepository;

    public TblGradeResource(TblGradeRepository tblGradeRepository) {
        this.tblGradeRepository = tblGradeRepository;
    }

    /**
     * POST  /tbl-grades : Create a new tblGrade.
     *
     * @param tblGrade the tblGrade to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tblGrade, or with status 400 (Bad Request) if the tblGrade has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tbl-grades")
    @Timed
    public ResponseEntity<TblGrade> createTblGrade(@RequestBody TblGrade tblGrade) throws URISyntaxException {
        log.debug("REST request to save TblGrade : {}", tblGrade);
        if (tblGrade.getId() != null) {
            throw new BadRequestAlertException("A new tblGrade cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TblGrade result = tblGradeRepository.save(tblGrade);
        return ResponseEntity.created(new URI("/api/tbl-grades/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tbl-grades : Updates an existing tblGrade.
     *
     * @param tblGrade the tblGrade to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tblGrade,
     * or with status 400 (Bad Request) if the tblGrade is not valid,
     * or with status 500 (Internal Server Error) if the tblGrade couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tbl-grades")
    @Timed
    public ResponseEntity<TblGrade> updateTblGrade(@RequestBody TblGrade tblGrade) throws URISyntaxException {
        log.debug("REST request to update TblGrade : {}", tblGrade);
        if (tblGrade.getId() == null) {
            return createTblGrade(tblGrade);
        }
        TblGrade result = tblGradeRepository.save(tblGrade);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tblGrade.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tbl-grades : get all the tblGrades.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tblGrades in body
     */
    @GetMapping("/tbl-grades")
    @Timed
    public List<TblGrade> getAllTblGrades() {
        log.debug("REST request to get all TblGrades");
        return tblGradeRepository.findAll();
        }

    /**
     * GET  /tbl-grades/:id : get the "id" tblGrade.
     *
     * @param id the id of the tblGrade to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tblGrade, or with status 404 (Not Found)
     */
    @GetMapping("/tbl-grades/{id}")
    @Timed
    public ResponseEntity<TblGrade> getTblGrade(@PathVariable Long id) {
        log.debug("REST request to get TblGrade : {}", id);
        TblGrade tblGrade = tblGradeRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tblGrade));
    }

    /**
     * DELETE  /tbl-grades/:id : delete the "id" tblGrade.
     *
     * @param id the id of the tblGrade to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tbl-grades/{id}")
    @Timed
    public ResponseEntity<Void> deleteTblGrade(@PathVariable Long id) {
        log.debug("REST request to delete TblGrade : {}", id);
        tblGradeRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
