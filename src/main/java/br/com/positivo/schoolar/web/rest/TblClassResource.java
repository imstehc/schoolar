package br.com.positivo.schoolar.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.positivo.schoolar.domain.TblClass;

import br.com.positivo.schoolar.repository.TblClassRepository;
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
 * REST controller for managing TblClass.
 */
@RestController
@RequestMapping("/api")
public class TblClassResource {

    private final Logger log = LoggerFactory.getLogger(TblClassResource.class);

    private static final String ENTITY_NAME = "tblClass";

    private final TblClassRepository tblClassRepository;

    public TblClassResource(TblClassRepository tblClassRepository) {
        this.tblClassRepository = tblClassRepository;
    }

    /**
     * POST  /tbl-classes : Create a new tblClass.
     *
     * @param tblClass the tblClass to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tblClass, or with status 400 (Bad Request) if the tblClass has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tbl-classes")
    @Timed
    public ResponseEntity<TblClass> createTblClass(@RequestBody TblClass tblClass) throws URISyntaxException {
        log.debug("REST request to save TblClass : {}", tblClass);
        if (tblClass.getId() != null) {
            throw new BadRequestAlertException("A new tblClass cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TblClass result = tblClassRepository.save(tblClass);
        return ResponseEntity.created(new URI("/api/tbl-classes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tbl-classes : Updates an existing tblClass.
     *
     * @param tblClass the tblClass to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tblClass,
     * or with status 400 (Bad Request) if the tblClass is not valid,
     * or with status 500 (Internal Server Error) if the tblClass couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tbl-classes")
    @Timed
    public ResponseEntity<TblClass> updateTblClass(@RequestBody TblClass tblClass) throws URISyntaxException {
        log.debug("REST request to update TblClass : {}", tblClass);
        if (tblClass.getId() == null) {
            return createTblClass(tblClass);
        }
        TblClass result = tblClassRepository.save(tblClass);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tblClass.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tbl-classes : get all the tblClasses.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tblClasses in body
     */
    @GetMapping("/tbl-classes")
    @Timed
    public List<TblClass> getAllTblClasses() {
        log.debug("REST request to get all TblClasses");
        return tblClassRepository.findAll();
        }

    /**
     * GET  /tbl-classes/:id : get the "id" tblClass.
     *
     * @param id the id of the tblClass to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tblClass, or with status 404 (Not Found)
     */
    @GetMapping("/tbl-classes/{id}")
    @Timed
    public ResponseEntity<TblClass> getTblClass(@PathVariable Long id) {
        log.debug("REST request to get TblClass : {}", id);
        TblClass tblClass = tblClassRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tblClass));
    }

    /**
     * DELETE  /tbl-classes/:id : delete the "id" tblClass.
     *
     * @param id the id of the tblClass to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tbl-classes/{id}")
    @Timed
    public ResponseEntity<Void> deleteTblClass(@PathVariable Long id) {
        log.debug("REST request to delete TblClass : {}", id);
        tblClassRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
