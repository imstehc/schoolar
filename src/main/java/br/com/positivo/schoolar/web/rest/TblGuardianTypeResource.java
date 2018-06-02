package br.com.positivo.schoolar.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.positivo.schoolar.domain.TblGuardianType;

import br.com.positivo.schoolar.repository.TblGuardianTypeRepository;
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
 * REST controller for managing TblGuardianType.
 */
@RestController
@RequestMapping("/api")
public class TblGuardianTypeResource {

    private final Logger log = LoggerFactory.getLogger(TblGuardianTypeResource.class);

    private static final String ENTITY_NAME = "tblGuardianType";

    private final TblGuardianTypeRepository tblGuardianTypeRepository;

    public TblGuardianTypeResource(TblGuardianTypeRepository tblGuardianTypeRepository) {
        this.tblGuardianTypeRepository = tblGuardianTypeRepository;
    }

    /**
     * POST  /tbl-guardian-types : Create a new tblGuardianType.
     *
     * @param tblGuardianType the tblGuardianType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tblGuardianType, or with status 400 (Bad Request) if the tblGuardianType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tbl-guardian-types")
    @Timed
    public ResponseEntity<TblGuardianType> createTblGuardianType(@Valid @RequestBody TblGuardianType tblGuardianType) throws URISyntaxException {
        log.debug("REST request to save TblGuardianType : {}", tblGuardianType);
        if (tblGuardianType.getId() != null) {
            throw new BadRequestAlertException("A new tblGuardianType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TblGuardianType result = tblGuardianTypeRepository.save(tblGuardianType);
        return ResponseEntity.created(new URI("/api/tbl-guardian-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tbl-guardian-types : Updates an existing tblGuardianType.
     *
     * @param tblGuardianType the tblGuardianType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tblGuardianType,
     * or with status 400 (Bad Request) if the tblGuardianType is not valid,
     * or with status 500 (Internal Server Error) if the tblGuardianType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tbl-guardian-types")
    @Timed
    public ResponseEntity<TblGuardianType> updateTblGuardianType(@Valid @RequestBody TblGuardianType tblGuardianType) throws URISyntaxException {
        log.debug("REST request to update TblGuardianType : {}", tblGuardianType);
        if (tblGuardianType.getId() == null) {
            return createTblGuardianType(tblGuardianType);
        }
        TblGuardianType result = tblGuardianTypeRepository.save(tblGuardianType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tblGuardianType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tbl-guardian-types : get all the tblGuardianTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tblGuardianTypes in body
     */
    @GetMapping("/tbl-guardian-types")
    @Timed
    public List<TblGuardianType> getAllTblGuardianTypes() {
        log.debug("REST request to get all TblGuardianTypes");
        return tblGuardianTypeRepository.findAll();
        }

    /**
     * GET  /tbl-guardian-types/:id : get the "id" tblGuardianType.
     *
     * @param id the id of the tblGuardianType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tblGuardianType, or with status 404 (Not Found)
     */
    @GetMapping("/tbl-guardian-types/{id}")
    @Timed
    public ResponseEntity<TblGuardianType> getTblGuardianType(@PathVariable Long id) {
        log.debug("REST request to get TblGuardianType : {}", id);
        TblGuardianType tblGuardianType = tblGuardianTypeRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tblGuardianType));
    }

    /**
     * DELETE  /tbl-guardian-types/:id : delete the "id" tblGuardianType.
     *
     * @param id the id of the tblGuardianType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tbl-guardian-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteTblGuardianType(@PathVariable Long id) {
        log.debug("REST request to delete TblGuardianType : {}", id);
        tblGuardianTypeRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
