package br.com.positivo.schoolar.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.positivo.schoolar.domain.TblClassCoordinator;

import br.com.positivo.schoolar.repository.TblClassCoordinatorRepository;
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
 * REST controller for managing TblClassCoordinator.
 */
@RestController
@RequestMapping("/api")
public class TblClassCoordinatorResource {

    private final Logger log = LoggerFactory.getLogger(TblClassCoordinatorResource.class);

    private static final String ENTITY_NAME = "tblClassCoordinator";

    private final TblClassCoordinatorRepository tblClassCoordinatorRepository;

    public TblClassCoordinatorResource(TblClassCoordinatorRepository tblClassCoordinatorRepository) {
        this.tblClassCoordinatorRepository = tblClassCoordinatorRepository;
    }

    /**
     * POST  /tbl-class-coordinators : Create a new tblClassCoordinator.
     *
     * @param tblClassCoordinator the tblClassCoordinator to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tblClassCoordinator, or with status 400 (Bad Request) if the tblClassCoordinator has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tbl-class-coordinators")
    @Timed
    public ResponseEntity<TblClassCoordinator> createTblClassCoordinator(@RequestBody TblClassCoordinator tblClassCoordinator) throws URISyntaxException {
        log.debug("REST request to save TblClassCoordinator : {}", tblClassCoordinator);
        if (tblClassCoordinator.getId() != null) {
            throw new BadRequestAlertException("A new tblClassCoordinator cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TblClassCoordinator result = tblClassCoordinatorRepository.save(tblClassCoordinator);
        return ResponseEntity.created(new URI("/api/tbl-class-coordinators/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tbl-class-coordinators : Updates an existing tblClassCoordinator.
     *
     * @param tblClassCoordinator the tblClassCoordinator to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tblClassCoordinator,
     * or with status 400 (Bad Request) if the tblClassCoordinator is not valid,
     * or with status 500 (Internal Server Error) if the tblClassCoordinator couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tbl-class-coordinators")
    @Timed
    public ResponseEntity<TblClassCoordinator> updateTblClassCoordinator(@RequestBody TblClassCoordinator tblClassCoordinator) throws URISyntaxException {
        log.debug("REST request to update TblClassCoordinator : {}", tblClassCoordinator);
        if (tblClassCoordinator.getId() == null) {
            return createTblClassCoordinator(tblClassCoordinator);
        }
        TblClassCoordinator result = tblClassCoordinatorRepository.save(tblClassCoordinator);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tblClassCoordinator.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tbl-class-coordinators : get all the tblClassCoordinators.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tblClassCoordinators in body
     */
    @GetMapping("/tbl-class-coordinators")
    @Timed
    public List<TblClassCoordinator> getAllTblClassCoordinators() {
        log.debug("REST request to get all TblClassCoordinators");
        return tblClassCoordinatorRepository.findAll();
        }

    /**
     * GET  /tbl-class-coordinators/:id : get the "id" tblClassCoordinator.
     *
     * @param id the id of the tblClassCoordinator to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tblClassCoordinator, or with status 404 (Not Found)
     */
    @GetMapping("/tbl-class-coordinators/{id}")
    @Timed
    public ResponseEntity<TblClassCoordinator> getTblClassCoordinator(@PathVariable Long id) {
        log.debug("REST request to get TblClassCoordinator : {}", id);
        TblClassCoordinator tblClassCoordinator = tblClassCoordinatorRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tblClassCoordinator));
    }

    /**
     * DELETE  /tbl-class-coordinators/:id : delete the "id" tblClassCoordinator.
     *
     * @param id the id of the tblClassCoordinator to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tbl-class-coordinators/{id}")
    @Timed
    public ResponseEntity<Void> deleteTblClassCoordinator(@PathVariable Long id) {
        log.debug("REST request to delete TblClassCoordinator : {}", id);
        tblClassCoordinatorRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
