package br.com.positivo.schoolar.web.rest;

import br.com.positivo.schoolar.domain.TblAddress;
import br.com.positivo.schoolar.domain.TblSchool;
import com.codahale.metrics.annotation.Timed;
import br.com.positivo.schoolar.domain.TblSchoolNetwork;

import br.com.positivo.schoolar.repository.TblSchoolNetworkRepository;
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
 * REST controller for managing TblSchoolNetwork.
 */
@RestController
@RequestMapping("/api")
public class TblSchoolNetworkResource {

    private final Logger log = LoggerFactory.getLogger(TblSchoolNetworkResource.class);

    private static final String ENTITY_NAME = "tblSchoolNetwork";

    private final TblSchoolNetworkRepository tblSchoolNetworkRepository;

    public TblSchoolNetworkResource(TblSchoolNetworkRepository tblSchoolNetworkRepository) {
        this.tblSchoolNetworkRepository = tblSchoolNetworkRepository;
    }

    /**
     * POST  /tbl-school-networks : Create a new tblSchoolNetwork.
     *
     * @param tblSchoolNetwork the tblSchoolNetwork to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tblSchoolNetwork, or with status 400 (Bad Request) if the tblSchoolNetwork has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tbl-school-networks")
    @Timed
    public ResponseEntity<TblSchoolNetwork> createTblSchoolNetwork(@Valid @RequestBody TblSchoolNetwork tblSchoolNetwork) throws URISyntaxException {
        log.debug("REST request to save TblSchoolNetwork : {}", tblSchoolNetwork);
        if (tblSchoolNetwork.getId() != null) {
            throw new BadRequestAlertException("A new tblSchoolNetwork cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TblSchoolNetwork result = tblSchoolNetworkRepository.save(tblSchoolNetwork);
        return ResponseEntity.created(new URI("/api/tbl-school-networks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tbl-school-networks : Updates an existing tblSchoolNetwork.
     *
     * @param tblSchoolNetwork the tblSchoolNetwork to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tblSchoolNetwork,
     * or with status 400 (Bad Request) if the tblSchoolNetwork is not valid,
     * or with status 500 (Internal Server Error) if the tblSchoolNetwork couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tbl-school-networks")
    @Timed
    public ResponseEntity<TblSchoolNetwork> updateTblSchoolNetwork(@Valid @RequestBody TblSchoolNetwork tblSchoolNetwork) throws URISyntaxException {
        log.debug("REST request to update TblSchoolNetwork : {}", tblSchoolNetwork);
        if (tblSchoolNetwork.getId() == null) {
            return createTblSchoolNetwork(tblSchoolNetwork);
        }
        TblSchoolNetwork result = tblSchoolNetworkRepository.save(tblSchoolNetwork);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tblSchoolNetwork.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tbl-school-networks : get all the tblSchoolNetworks.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tblSchoolNetworks in body
     */
    @GetMapping("/tbl-school-networks")
    @Timed
    public List<TblSchoolNetwork> getAllTblSchoolNetworks() {
        log.debug("REST request to get all TblSchoolNetworks");
        return tblSchoolNetworkRepository.findAllWithEagerRelationships();
        }

    /**
     * GET  /tbl-school-networks/:id : get the "id" tblSchoolNetwork.
     *
     * @param id the id of the tblSchoolNetwork to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tblSchoolNetwork, or with status 404 (Not Found)
     */
    @GetMapping("/tbl-school-networks/{id}")
    @Timed
    public ResponseEntity<TblSchoolNetwork> getTblSchoolNetwork(@PathVariable Long id) {
        log.debug("REST request to get TblSchoolNetwork : {}", id);
        TblSchoolNetwork tblSchoolNetwork = tblSchoolNetworkRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tblSchoolNetwork));
    }

    /**
     * DELETE  /tbl-school-networks/:id : delete the "id" tblSchoolNetwork.
     *
     * @param id the id of the tblSchoolNetwork to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tbl-school-networks/{id}")
    @Timed
    public ResponseEntity<Void> deleteTblSchoolNetwork(@PathVariable Long id) {
        log.debug("REST request to delete TblSchoolNetwork : {}", id);
        tblSchoolNetworkRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * GET  /tbl-school-from-school-networks/:id get the "id" tblSchoolNetwork.
     *
     * @param id the id of the tblSchoolNetwork to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tblSchoolNetwork, or with status 404 (Not Found)
     */
    @GetMapping("/tbl-school-from-school-networks/{id}")
    @Timed
    public List<TblSchool> getAllTblSchoolFromNetwork(@PathVariable Long id) {
        log.debug("REST request to get TblSchoolNetwork : {}", id);
        return  tblSchoolNetworkRepository.findAllSchoolsWithEagerRelationships(id);
    }


}

