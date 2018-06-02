package br.com.positivo.schoolar.web.rest;

import br.com.positivo.schoolar.service.TblGuardianService;
import br.com.positivo.schoolar.service.dto.TblGuardianDTO;
import br.com.positivo.schoolar.service.dto.TblUserDTO;
import com.codahale.metrics.annotation.Timed;
import br.com.positivo.schoolar.domain.TblGuardian;

import br.com.positivo.schoolar.repository.TblGuardianRepository;
import br.com.positivo.schoolar.web.rest.errors.BadRequestAlertException;
import br.com.positivo.schoolar.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing TblGuardian.
 */
@RestController
@RequestMapping("/api")
public class TblGuardianResource {

    private final Logger log = LoggerFactory.getLogger(TblGuardianResource.class);

    private static final String ENTITY_NAME = "tblGuardian";

    private final TblGuardianRepository tblGuardianRepository;

    @Autowired
    private TblGuardianService tblGuardianService;

    public TblGuardianResource(TblGuardianRepository tblGuardianRepository) {
        this.tblGuardianRepository = tblGuardianRepository;
    }

    /**
     * POST  /tbl-guardians : Create a new tblGuardian.
     *
     * @param tblGuardian the tblGuardian to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tblGuardian, or with status 400 (Bad Request) if the tblGuardian has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tbl-guardians")
    @Timed
    public ResponseEntity<TblGuardian> createTblGuardian(@RequestBody TblGuardian tblGuardian) throws URISyntaxException {
        log.debug("REST request to save TblGuardian : {}", tblGuardian);
        if (tblGuardian.getId() != null) {
            throw new BadRequestAlertException("A new tblGuardian cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TblGuardian result = tblGuardianRepository.save(tblGuardian);
        return ResponseEntity.created(new URI("/api/tbl-guardians/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tbl-guardians : Updates an existing tblGuardian.
     *
     * @param tblGuardian the tblGuardian to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tblGuardian,
     * or with status 400 (Bad Request) if the tblGuardian is not valid,
     * or with status 500 (Internal Server Error) if the tblGuardian couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tbl-guardians")
    @Timed
    public ResponseEntity<TblGuardian> updateTblGuardian(@RequestBody TblGuardian tblGuardian) throws URISyntaxException {
        log.debug("REST request to update TblGuardian : {}", tblGuardian);
        if (tblGuardian.getId() == null) {
            return createTblGuardian(tblGuardian);
        }
        TblGuardian result = tblGuardianRepository.save(tblGuardian);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tblGuardian.getId().toString()))
            .body(result);
    }


    /**
     * GET  /tbl-guardians : get all the tblGuardians.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tblGuardians in body
     */
    @GetMapping("/tbl-guardians")
    @Timed
    public List<TblGuardianDTO> getAllTblGuardians() {
        log.debug("REST request to get all TblGuardians");

        return tblGuardianRepository.findAllGuardians();
    }

    /**
     * GET  /tbl-guardians/:id : get the "id" tblGuardian.
     *
     * @param id the id of the tblGuardian to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tblGuardian, or with status 404 (Not Found)
     */
    @GetMapping("/tbl-guardians/{id}")
    @Timed
    public ResponseEntity<TblGuardian> getTblGuardian(@PathVariable Long id) {
        log.debug("REST request to get TblGuardian : {}", id);
        TblGuardian tblGuardian = tblGuardianRepository.findOne(id);

        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tblGuardian));
    }

    /**
     * DELETE  /tbl-guardians/:id : delete the "id" tblGuardian.
     *
     * @param userId the id of the tblGuardian to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tbl-guardians/{userId}")
    @Timed
    public ResponseEntity<Void> deleteTblGuardian(@PathVariable Long userId) {
        log.debug("REST request to delete TblGuardian : {}", userId);
        tblGuardianService.deleteUserIdGuardian(userId);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, userId.toString())).build();
    }

    /**
     * GET  /tbl-guardians : get List all dependents from tblUser by tblGuardian.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of dependents from TblUser by tblGuardian in body
     * http://git.fpf.br/positivo/smartcampus/issues/785
     * https://private-eac50-mateus.apiary-mock.com/dependent/byGuardian
     */
    @GetMapping("/tbl-guardians/dependents-by-guardian/{id}")
    @Timed
    public ResponseEntity<List<TblUserDTO>> getAllDependentsByGuardianId(@PathVariable final Long id) {
        log.debug("REST request to get all dependents by TblGuardian");
        return  ResponseUtil.wrapOrNotFound(Optional.ofNullable(this.tblGuardianService.getAllDependentsByGuardianId(id)));
    }
}
