package br.com.positivo.schoolar.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.positivo.schoolar.domain.TblSchoolUser;

import br.com.positivo.schoolar.repository.TblSchoolUserRepository;
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
 * REST controller for managing TblSchoolUser.
 */
@RestController
@RequestMapping("/api")
public class TblSchoolUserResource {

    private final Logger log = LoggerFactory.getLogger(TblSchoolUserResource.class);

    private static final String ENTITY_NAME = "tblSchoolUser";

    private final TblSchoolUserRepository tblSchoolUserRepository;

    public TblSchoolUserResource(TblSchoolUserRepository tblSchoolUserRepository) {
        this.tblSchoolUserRepository = tblSchoolUserRepository;
    }

    /**
     * POST  /tbl-school-users : Create a new tblSchoolUser.
     *
     * @param tblSchoolUser the tblSchoolUser to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tblSchoolUser, or with status 400 (Bad Request) if the tblSchoolUser has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tbl-school-users")
    @Timed
    public ResponseEntity<TblSchoolUser> createTblSchoolUser(@Valid @RequestBody TblSchoolUser tblSchoolUser) throws URISyntaxException {
        log.debug("REST request to save TblSchoolUser : {}", tblSchoolUser);
        if (tblSchoolUser.getId() != null) {
            throw new BadRequestAlertException("A new tblSchoolUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TblSchoolUser result = tblSchoolUserRepository.save(tblSchoolUser);
        return ResponseEntity.created(new URI("/api/tbl-school-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tbl-school-users : Updates an existing tblSchoolUser.
     *
     * @param tblSchoolUser the tblSchoolUser to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tblSchoolUser,
     * or with status 400 (Bad Request) if the tblSchoolUser is not valid,
     * or with status 500 (Internal Server Error) if the tblSchoolUser couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tbl-school-users")
    @Timed
    public ResponseEntity<TblSchoolUser> updateTblSchoolUser(@Valid @RequestBody TblSchoolUser tblSchoolUser) throws URISyntaxException {
        log.debug("REST request to update TblSchoolUser : {}", tblSchoolUser);
        if (tblSchoolUser.getId() == null) {
            return createTblSchoolUser(tblSchoolUser);
        }
        TblSchoolUser result = tblSchoolUserRepository.save(tblSchoolUser);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tblSchoolUser.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tbl-school-users : get all the tblSchoolUsers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tblSchoolUsers in body
     */
    @GetMapping("/tbl-school-users")
    @Timed
    public List<TblSchoolUser> getAllTblSchoolUsers() {
        log.debug("REST request to get all TblSchoolUsers");
        return tblSchoolUserRepository.findAll();
        }

    /**
     * GET  /tbl-school-users/:id : get the "id" tblSchoolUser.
     *
     * @param id the id of the tblSchoolUser to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tblSchoolUser, or with status 404 (Not Found)
     */
    @GetMapping("/tbl-school-users/{id}")
    @Timed
    public ResponseEntity<TblSchoolUser> getTblSchoolUser(@PathVariable Long id) {
        log.debug("REST request to get TblSchoolUser : {}", id);
        TblSchoolUser tblSchoolUser = tblSchoolUserRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tblSchoolUser));
    }

    /**
     * DELETE  /tbl-school-users/:id : delete the "id" tblSchoolUser.
     *
     * @param id the id of the tblSchoolUser to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tbl-school-users/{id}")
    @Timed
    public ResponseEntity<Void> deleteTblSchoolUser(@PathVariable Long id) {
        log.debug("REST request to delete TblSchoolUser : {}", id);
        tblSchoolUserRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
