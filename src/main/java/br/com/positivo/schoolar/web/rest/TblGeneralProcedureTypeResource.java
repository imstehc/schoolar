package br.com.positivo.schoolar.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.positivo.schoolar.domain.TblGeneralProcedureType;

import br.com.positivo.schoolar.repository.TblGeneralProcedureTypeRepository;
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
 * REST controller for managing TblGeneralProcedureType.
 */
@RestController
@RequestMapping("/api")
public class TblGeneralProcedureTypeResource {

    private final Logger log = LoggerFactory.getLogger(TblGeneralProcedureTypeResource.class);

    private static final String ENTITY_NAME = "tblGeneralProcedureType";

    private final TblGeneralProcedureTypeRepository tblGeneralProcedureTypeRepository;

    public TblGeneralProcedureTypeResource(TblGeneralProcedureTypeRepository tblGeneralProcedureTypeRepository) {
        this.tblGeneralProcedureTypeRepository = tblGeneralProcedureTypeRepository;
    }

    /**
     * POST  /tbl-general-procedure-types : Create a new tblGeneralProcedureType.
     *
     * @param tblGeneralProcedureType the tblGeneralProcedureType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tblGeneralProcedureType, or with status 400 (Bad Request) if the tblGeneralProcedureType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tbl-general-procedure-types")
    @Timed
    public ResponseEntity<TblGeneralProcedureType> createTblGeneralProcedureType(@Valid @RequestBody TblGeneralProcedureType tblGeneralProcedureType) throws URISyntaxException {
        log.debug("REST request to save TblGeneralProcedureType : {}", tblGeneralProcedureType);
        if (tblGeneralProcedureType.getId() != null) {
            throw new BadRequestAlertException("A new tblGeneralProcedureType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TblGeneralProcedureType result = tblGeneralProcedureTypeRepository.save(tblGeneralProcedureType);
        return ResponseEntity.created(new URI("/api/tbl-general-procedure-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tbl-general-procedure-types : Updates an existing tblGeneralProcedureType.
     *
     * @param tblGeneralProcedureType the tblGeneralProcedureType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tblGeneralProcedureType,
     * or with status 400 (Bad Request) if the tblGeneralProcedureType is not valid,
     * or with status 500 (Internal Server Error) if the tblGeneralProcedureType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tbl-general-procedure-types")
    @Timed
    public ResponseEntity<TblGeneralProcedureType> updateTblGeneralProcedureType(@Valid @RequestBody TblGeneralProcedureType tblGeneralProcedureType) throws URISyntaxException {
        log.debug("REST request to update TblGeneralProcedureType : {}", tblGeneralProcedureType);
        if (tblGeneralProcedureType.getId() == null) {
            return createTblGeneralProcedureType(tblGeneralProcedureType);
        }
        TblGeneralProcedureType result = tblGeneralProcedureTypeRepository.save(tblGeneralProcedureType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tblGeneralProcedureType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tbl-general-procedure-types : get all the tblGeneralProcedureTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tblGeneralProcedureTypes in body
     */
    @GetMapping("/tbl-general-procedure-types")
    @Timed
    public List<TblGeneralProcedureType> getAllTblGeneralProcedureTypes() {
        log.debug("REST request to get all TblGeneralProcedureTypes");
        return tblGeneralProcedureTypeRepository.findAll();
        }

    /**
     * GET  /tbl-general-procedure-types/:id : get the "id" tblGeneralProcedureType.
     *
     * @param id the id of the tblGeneralProcedureType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tblGeneralProcedureType, or with status 404 (Not Found)
     */
    @GetMapping("/tbl-general-procedure-types/{id}")
    @Timed
    public ResponseEntity<TblGeneralProcedureType> getTblGeneralProcedureType(@PathVariable Long id) {
        log.debug("REST request to get TblGeneralProcedureType : {}", id);
        TblGeneralProcedureType tblGeneralProcedureType = tblGeneralProcedureTypeRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tblGeneralProcedureType));
    }

    /**
     * DELETE  /tbl-general-procedure-types/:id : delete the "id" tblGeneralProcedureType.
     *
     * @param id the id of the tblGeneralProcedureType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tbl-general-procedure-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteTblGeneralProcedureType(@PathVariable Long id) {
        log.debug("REST request to delete TblGeneralProcedureType : {}", id);
        tblGeneralProcedureTypeRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
