package br.com.positivo.schoolar.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.positivo.schoolar.domain.TblLevelType;

import br.com.positivo.schoolar.repository.TblLevelTypeRepository;
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
 * REST controller for managing TblLevelType.
 */
@RestController
@RequestMapping("/api")
public class TblLevelTypeResource {

    private final Logger log = LoggerFactory.getLogger(TblLevelTypeResource.class);

    private static final String ENTITY_NAME = "tblLevelType";

    private final TblLevelTypeRepository tblLevelTypeRepository;

    public TblLevelTypeResource(TblLevelTypeRepository tblLevelTypeRepository) {
        this.tblLevelTypeRepository = tblLevelTypeRepository;
    }

    /**
     * POST  /tbl-level-types : Create a new tblLevelType.
     *
     * @param tblLevelType the tblLevelType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tblLevelType, or with status 400 (Bad Request) if the tblLevelType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tbl-level-types")
    @Timed
    public ResponseEntity<TblLevelType> createTblLevelType(@RequestBody TblLevelType tblLevelType) throws URISyntaxException {
        log.debug("REST request to save TblLevelType : {}", tblLevelType);
        if (tblLevelType.getId() != null) {
            throw new BadRequestAlertException("A new tblLevelType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TblLevelType result = tblLevelTypeRepository.save(tblLevelType);
        return ResponseEntity.created(new URI("/api/tbl-level-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tbl-level-types : Updates an existing tblLevelType.
     *
     * @param tblLevelType the tblLevelType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tblLevelType,
     * or with status 400 (Bad Request) if the tblLevelType is not valid,
     * or with status 500 (Internal Server Error) if the tblLevelType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tbl-level-types")
    @Timed
    public ResponseEntity<TblLevelType> updateTblLevelType(@RequestBody TblLevelType tblLevelType) throws URISyntaxException {
        log.debug("REST request to update TblLevelType : {}", tblLevelType);
        if (tblLevelType.getId() == null) {
            return createTblLevelType(tblLevelType);
        }
        TblLevelType result = tblLevelTypeRepository.save(tblLevelType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tblLevelType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tbl-level-types : get all the tblLevelTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tblLevelTypes in body
     */
    @GetMapping("/tbl-level-types")
    @Timed
    public List<TblLevelType> getAllTblLevelTypes() {
        log.debug("REST request to get all TblLevelTypes");
        return tblLevelTypeRepository.findAll();
        }

    /**
     * GET  /tbl-level-types/:id : get the "id" tblLevelType.
     *
     * @param id the id of the tblLevelType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tblLevelType, or with status 404 (Not Found)
     */
    @GetMapping("/tbl-level-types/{id}")
    @Timed
    public ResponseEntity<TblLevelType> getTblLevelType(@PathVariable Long id) {
        log.debug("REST request to get TblLevelType : {}", id);
        TblLevelType tblLevelType = tblLevelTypeRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tblLevelType));
    }

    /**
     * DELETE  /tbl-level-types/:id : delete the "id" tblLevelType.
     *
     * @param id the id of the tblLevelType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tbl-level-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteTblLevelType(@PathVariable Long id) {
        log.debug("REST request to delete TblLevelType : {}", id);
        tblLevelTypeRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
