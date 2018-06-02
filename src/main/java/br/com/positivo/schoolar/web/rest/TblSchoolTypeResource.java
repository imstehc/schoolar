package br.com.positivo.schoolar.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.positivo.schoolar.domain.TblSchoolType;

import br.com.positivo.schoolar.repository.TblSchoolTypeRepository;
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
 * REST controller for managing TblSchoolType.
 */
@RestController
@RequestMapping("/api")
public class TblSchoolTypeResource {

    private final Logger log = LoggerFactory.getLogger(TblSchoolTypeResource.class);

    private static final String ENTITY_NAME = "tblSchoolType";

    private final TblSchoolTypeRepository tblSchoolTypeRepository;

    public TblSchoolTypeResource(TblSchoolTypeRepository tblSchoolTypeRepository) {
        this.tblSchoolTypeRepository = tblSchoolTypeRepository;
    }

    /**
     * POST  /tbl-school-types : Create a new tblSchoolType.
     *
     * @param tblSchoolType the tblSchoolType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tblSchoolType, or with status 400 (Bad Request) if the tblSchoolType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tbl-school-types")
    @Timed
    public ResponseEntity<TblSchoolType> createTblSchoolType(@Valid @RequestBody TblSchoolType tblSchoolType) throws URISyntaxException {
        log.debug("REST request to save TblSchoolType : {}", tblSchoolType);
        if (tblSchoolType.getId() != null) {
            throw new BadRequestAlertException("A new tblSchoolType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TblSchoolType result = tblSchoolTypeRepository.save(tblSchoolType);
        return ResponseEntity.created(new URI("/api/tbl-school-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tbl-school-types : Updates an existing tblSchoolType.
     *
     * @param tblSchoolType the tblSchoolType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tblSchoolType,
     * or with status 400 (Bad Request) if the tblSchoolType is not valid,
     * or with status 500 (Internal Server Error) if the tblSchoolType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tbl-school-types")
    @Timed
    public ResponseEntity<TblSchoolType> updateTblSchoolType(@Valid @RequestBody TblSchoolType tblSchoolType) throws URISyntaxException {
        log.debug("REST request to update TblSchoolType : {}", tblSchoolType);
        if (tblSchoolType.getId() == null) {
            return createTblSchoolType(tblSchoolType);
        }
        TblSchoolType result = tblSchoolTypeRepository.save(tblSchoolType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tblSchoolType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tbl-school-types : get all the tblSchoolTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tblSchoolTypes in body
     */
    @GetMapping("/tbl-school-types")
    @Timed
    public List<TblSchoolType> getAllTblSchoolTypes() {
        log.debug("REST request to get all TblSchoolTypes");
        return tblSchoolTypeRepository.findAll();
        }

    /**
     * GET  /tbl-school-types/:id : get the "id" tblSchoolType.
     *
     * @param id the id of the tblSchoolType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tblSchoolType, or with status 404 (Not Found)
     */
    @GetMapping("/tbl-school-types/{id}")
    @Timed
    public ResponseEntity<TblSchoolType> getTblSchoolType(@PathVariable Long id) {
        log.debug("REST request to get TblSchoolType : {}", id);
        TblSchoolType tblSchoolType = tblSchoolTypeRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tblSchoolType));
    }

    /**
     * DELETE  /tbl-school-types/:id : delete the "id" tblSchoolType.
     *
     * @param id the id of the tblSchoolType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tbl-school-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteTblSchoolType(@PathVariable Long id) {
        log.debug("REST request to delete TblSchoolType : {}", id);
        tblSchoolTypeRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
