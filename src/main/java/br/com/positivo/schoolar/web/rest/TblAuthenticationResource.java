package br.com.positivo.schoolar.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.positivo.schoolar.domain.TblAuthentication;

import br.com.positivo.schoolar.repository.TblAuthenticationRepository;
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
 * REST controller for managing TblAuthentication.
 */
@RestController
@RequestMapping("/api")
public class TblAuthenticationResource {

    private final Logger log = LoggerFactory.getLogger(TblAuthenticationResource.class);

    private static final String ENTITY_NAME = "tblAuthentication";

    private final TblAuthenticationRepository tblAuthenticationRepository;

    public TblAuthenticationResource(TblAuthenticationRepository tblAuthenticationRepository) {
        this.tblAuthenticationRepository = tblAuthenticationRepository;
    }

    /**
     * POST  /tbl-authentications : Create a new tblAuthentication.
     *
     * @param tblAuthentication the tblAuthentication to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tblAuthentication, or with status 400 (Bad Request) if the tblAuthentication has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tbl-authentications")
    @Timed
    public ResponseEntity<TblAuthentication> createTblAuthentication(@Valid @RequestBody TblAuthentication tblAuthentication) throws URISyntaxException {
        log.debug("REST request to save TblAuthentication : {}", tblAuthentication);
        if (tblAuthentication.getId() != null) {
            throw new BadRequestAlertException("A new tblAuthentication cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TblAuthentication result = tblAuthenticationRepository.save(tblAuthentication);
        return ResponseEntity.created(new URI("/api/tbl-authentications/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tbl-authentications : Updates an existing tblAuthentication.
     *
     * @param tblAuthentication the tblAuthentication to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tblAuthentication,
     * or with status 400 (Bad Request) if the tblAuthentication is not valid,
     * or with status 500 (Internal Server Error) if the tblAuthentication couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tbl-authentications")
    @Timed
    public ResponseEntity<TblAuthentication> updateTblAuthentication(@Valid @RequestBody TblAuthentication tblAuthentication) throws URISyntaxException {
        log.debug("REST request to update TblAuthentication : {}", tblAuthentication);
        if (tblAuthentication.getId() == null) {
            return createTblAuthentication(tblAuthentication);
        }
        TblAuthentication result = tblAuthenticationRepository.save(tblAuthentication);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tblAuthentication.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tbl-authentications : get all the tblAuthentications.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tblAuthentications in body
     */
    @GetMapping("/tbl-authentications")
    @Timed
    public List<TblAuthentication> getAllTblAuthentications() {
        log.debug("REST request to get all TblAuthentications");
        return tblAuthenticationRepository.findAll();
        }

    /**
     * GET  /tbl-authentications/:id : get the "id" tblAuthentication.
     *
     * @param id the id of the tblAuthentication to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tblAuthentication, or with status 404 (Not Found)
     */
    @GetMapping("/tbl-authentications/{id}")
    @Timed
    public ResponseEntity<TblAuthentication> getTblAuthentication(@PathVariable Long id) {
        log.debug("REST request to get TblAuthentication : {}", id);
        TblAuthentication tblAuthentication = tblAuthenticationRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tblAuthentication));
    }

    /**
     * DELETE  /tbl-authentications/:id : delete the "id" tblAuthentication.
     *
     * @param id the id of the tblAuthentication to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tbl-authentications/{id}")
    @Timed
    public ResponseEntity<Void> deleteTblAuthentication(@PathVariable Long id) {
        log.debug("REST request to delete TblAuthentication : {}", id);
        tblAuthenticationRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
