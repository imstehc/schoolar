package br.com.positivo.schoolar.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.positivo.schoolar.domain.TblShiftType;

import br.com.positivo.schoolar.repository.TblShiftTypeRepository;
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
 * REST controller for managing TblShiftType.
 */
@RestController
@RequestMapping("/api")
public class TblShiftTypeResource {

    private final Logger log = LoggerFactory.getLogger(TblShiftTypeResource.class);

    private static final String ENTITY_NAME = "tblShiftType";

    private final TblShiftTypeRepository tblShiftTypeRepository;

    public TblShiftTypeResource(TblShiftTypeRepository tblShiftTypeRepository) {
        this.tblShiftTypeRepository = tblShiftTypeRepository;
    }

    /**
     * POST  /tbl-shift-types : Create a new tblShiftType.
     *
     * @param tblShiftType the tblShiftType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tblShiftType, or with status 400 (Bad Request) if the tblShiftType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tbl-shift-types")
    @Timed
    public ResponseEntity<TblShiftType> createTblShiftType(@RequestBody TblShiftType tblShiftType) throws URISyntaxException {
        log.debug("REST request to save TblShiftType : {}", tblShiftType);
        if (tblShiftType.getId() != null) {
            throw new BadRequestAlertException("A new tblShiftType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TblShiftType result = tblShiftTypeRepository.save(tblShiftType);
        return ResponseEntity.created(new URI("/api/tbl-shift-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tbl-shift-types : Updates an existing tblShiftType.
     *
     * @param tblShiftType the tblShiftType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tblShiftType,
     * or with status 400 (Bad Request) if the tblShiftType is not valid,
     * or with status 500 (Internal Server Error) if the tblShiftType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tbl-shift-types")
    @Timed
    public ResponseEntity<TblShiftType> updateTblShiftType(@RequestBody TblShiftType tblShiftType) throws URISyntaxException {
        log.debug("REST request to update TblShiftType : {}", tblShiftType);
        if (tblShiftType.getId() == null) {
            return createTblShiftType(tblShiftType);
        }
        TblShiftType result = tblShiftTypeRepository.save(tblShiftType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tblShiftType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tbl-shift-types : get all the tblShiftTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tblShiftTypes in body
     */
    @GetMapping("/tbl-shift-types")
    @Timed
    public List<TblShiftType> getAllTblShiftTypes() {
        log.debug("REST request to get all TblShiftTypes");
        return tblShiftTypeRepository.findAll();
        }

    /**
     * GET  /tbl-shift-types/:id : get the "id" tblShiftType.
     *
     * @param id the id of the tblShiftType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tblShiftType, or with status 404 (Not Found)
     */
    @GetMapping("/tbl-shift-types/{id}")
    @Timed
    public ResponseEntity<TblShiftType> getTblShiftType(@PathVariable Long id) {
        log.debug("REST request to get TblShiftType : {}", id);
        TblShiftType tblShiftType = tblShiftTypeRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tblShiftType));
    }

    /**
     * DELETE  /tbl-shift-types/:id : delete the "id" tblShiftType.
     *
     * @param id the id of the tblShiftType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tbl-shift-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteTblShiftType(@PathVariable Long id) {
        log.debug("REST request to delete TblShiftType : {}", id);
        tblShiftTypeRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
