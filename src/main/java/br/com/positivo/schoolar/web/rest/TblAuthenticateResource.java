package br.com.positivo.schoolar.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.positivo.schoolar.domain.TblAuthenticate;

import br.com.positivo.schoolar.repository.TblAuthenticateRepository;
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
 * REST controller for managing TblAuthenticate.
 */
@RestController
@RequestMapping("/api")
public class TblAuthenticateResource {

    private final Logger log = LoggerFactory.getLogger(TblAuthenticateResource.class);

    private static final String ENTITY_NAME = "tblAuthenticate";

    private final TblAuthenticateRepository tblAuthenticateRepository;

    public TblAuthenticateResource(TblAuthenticateRepository tblAuthenticateRepository) {
        this.tblAuthenticateRepository = tblAuthenticateRepository;
    }

    /**
     * POST  /tbl-authenticates : Create a new tblAuthenticate.
     *
     * @param tblAuthenticate the tblAuthenticate to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tblAuthenticate, or with status 400 (Bad Request) if the tblAuthenticate has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tbl-authenticates")
    @Timed
    public ResponseEntity<TblAuthenticate> createTblAuthenticate(@RequestBody TblAuthenticate tblAuthenticate) throws URISyntaxException {
        log.debug("REST request to save TblAuthenticate : {}", tblAuthenticate);
        if (tblAuthenticate.getId() != null) {
            throw new BadRequestAlertException("A new tblAuthenticate cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TblAuthenticate result = tblAuthenticateRepository.save(tblAuthenticate);
        return ResponseEntity.created(new URI("/api/tbl-authenticates/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tbl-authenticates : Updates an existing tblAuthenticate.
     *
     * @param tblAuthenticate the tblAuthenticate to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tblAuthenticate,
     * or with status 400 (Bad Request) if the tblAuthenticate is not valid,
     * or with status 500 (Internal Server Error) if the tblAuthenticate couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tbl-authenticates")
    @Timed
    public ResponseEntity<TblAuthenticate> updateTblAuthenticate(@RequestBody TblAuthenticate tblAuthenticate) throws URISyntaxException {
        log.debug("REST request to update TblAuthenticate : {}", tblAuthenticate);
        if (tblAuthenticate.getId() == null) {
            return createTblAuthenticate(tblAuthenticate);
        }
        TblAuthenticate result = tblAuthenticateRepository.save(tblAuthenticate);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tblAuthenticate.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tbl-authenticates : get all the tblAuthenticates.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tblAuthenticates in body
     */
    @GetMapping("/tbl-authenticates")
    @Timed
    public List<TblAuthenticate> getAllTblAuthenticates() {
        log.debug("REST request to get all TblAuthenticates");
        return tblAuthenticateRepository.findAll();
        }

    /**
     * GET  /tbl-authenticates/:id : get the "id" tblAuthenticate.
     *
     * @param id the id of the tblAuthenticate to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tblAuthenticate, or with status 404 (Not Found)
     */
    @GetMapping("/tbl-authenticates/{id}")
    @Timed
    public ResponseEntity<TblAuthenticate> getTblAuthenticate(@PathVariable Long id) {
        log.debug("REST request to get TblAuthenticate : {}", id);
        TblAuthenticate tblAuthenticate = tblAuthenticateRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tblAuthenticate));
    }

    /**
     * DELETE  /tbl-authenticates/:id : delete the "id" tblAuthenticate.
     *
     * @param id the id of the tblAuthenticate to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tbl-authenticates/{id}")
    @Timed
    public ResponseEntity<Void> deleteTblAuthenticate(@PathVariable Long id) {
        log.debug("REST request to delete TblAuthenticate : {}", id);
        tblAuthenticateRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
